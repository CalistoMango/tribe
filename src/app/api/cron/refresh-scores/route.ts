import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '~/lib/supabase'
import { getNeynarClient } from '~/lib/neynar'

// Verify the request is from Vercel Cron
function verifyCronSecret(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  // If no CRON_SECRET is set, allow in development
  if (!cronSecret) {
    return process.env.NODE_ENV === 'development'
  }

  return authHeader === `Bearer ${cronSecret}`
}

// Fetch Neynar scores for multiple fids in batches
async function fetchNeynarScores(fids: number[]): Promise<Map<number, number | null>> {
  const scores = new Map<number, number | null>()
  const client = getNeynarClient()

  // Neynar allows up to 100 fids per request
  const BATCH_SIZE = 100

  for (let i = 0; i < fids.length; i += BATCH_SIZE) {
    const batch = fids.slice(i, i + BATCH_SIZE)

    try {
      const response = await client.fetchBulkUsers({ fids: batch })

      for (const user of response.users) {
        scores.set(user.fid, user.experimental?.neynar_user_score ?? null)
      }
    } catch (error) {
      console.error(`Error fetching scores for batch starting at ${i}:`, error)
      // Set null for failed batch
      for (const fid of batch) {
        scores.set(fid, null)
      }
    }
  }

  return scores
}

// GET /api/cron/refresh-scores
// Vercel Cron job to refresh Neynar scores for all discoverable users
export async function GET(request: NextRequest) {
  // Verify the request is authorized
  if (!verifyCronSecret(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Fetch all discoverable users
    const { data: users, error: fetchError } = await supabase
      .from('users')
      .select('fid')
      .eq('discoverable', true)

    if (fetchError) {
      console.error('Error fetching users:', fetchError)
      return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
    }

    if (!users || users.length === 0) {
      return NextResponse.json({ message: 'No discoverable users to update', updated: 0 })
    }

    const fids = users.map(u => u.fid)
    console.log(`Refreshing scores for ${fids.length} discoverable users`)

    // Fetch all scores from Neynar
    const scores = await fetchNeynarScores(fids)

    // Update each user's score in the database
    let updated = 0
    let failed = 0

    for (const [fid, score] of scores) {
      if (score === null) {
        failed++
        continue
      }

      const { error: updateError } = await supabase
        .from('users')
        .update({
          score,
          updated_at: new Date().toISOString(),
        })
        .eq('fid', fid)

      if (updateError) {
        console.error(`Error updating score for fid ${fid}:`, updateError)
        failed++
      } else {
        updated++
      }
    }

    console.log(`Score refresh complete: ${updated} updated, ${failed} failed`)

    return NextResponse.json({
      message: 'Score refresh complete',
      total: fids.length,
      updated,
      failed,
    })
  } catch (error) {
    console.error('Cron job error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
