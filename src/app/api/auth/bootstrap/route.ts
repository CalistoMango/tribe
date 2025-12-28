import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '~/lib/supabase'
import { nanoid } from 'nanoid'

// POST /api/auth/bootstrap
// Called after Farcaster login to upsert user in database
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fid, username, displayName, pfpUrl, referralCode } = body

    if (!fid) {
      return NextResponse.json({ error: 'Missing fid' }, { status: 400 })
    }

    // Check if user exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('fid', fid)
      .single()

    if (existingUser) {
      // Update existing user (sync latest Farcaster data)
      const { data: updatedUser, error } = await supabase
        .from('users')
        .update({
          username: username || existingUser.username,
          display_name: displayName || existingUser.display_name,
          pfp_url: pfpUrl || existingUser.pfp_url,
          updated_at: new Date().toISOString(),
        })
        .eq('fid', fid)
        .select()
        .single()

      if (error) {
        console.error('Error updating user:', error)
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
      }

      return NextResponse.json({ user: updatedUser, isNew: false })
    }

    // Create new user
    const newUserReferralCode = nanoid(8)

    // Check if referral code is valid
    let referredByFid: number | null = null
    if (referralCode) {
      const { data: referrer } = await supabase
        .from('users')
        .select('fid')
        .eq('referral_code', referralCode)
        .single()

      if (referrer) {
        referredByFid = referrer.fid
      }
    }

    const { data: newUser, error } = await supabase
      .from('users')
      .insert({
        fid,
        username,
        display_name: displayName,
        pfp_url: pfpUrl,
        referral_code: newUserReferralCode,
        referred_by_fid: referredByFid,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating user:', error)
      return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
    }

    return NextResponse.json({ user: newUser, isNew: true })
  } catch (error) {
    console.error('Bootstrap error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
