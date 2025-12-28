import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('Testing Supabase connection...')
console.log('URL:', supabaseUrl)
console.log('Key:', supabaseKey ? `${supabaseKey.slice(0, 20)}...` : 'MISSING')

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials!')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Check connection and tables
const { error: authError } = await supabase.auth.getSession()

if (authError) {
  console.error('❌ Connection failed:', authError.message)
  process.exit(1)
}

console.log('✅ Connection successful!')

// Check categories table
const { data: categories, error: catError } = await supabase
  .from('categories')
  .select('*')
  .order('sort_order')

if (catError) {
  console.log('❌ Categories table:', catError.message)
} else {
  console.log(`✅ Categories table: ${categories?.length} rows`)
}

// Check users table
const { data: users, error: userError } = await supabase
  .from('users')
  .select('*')
  .limit(1)

if (userError) {
  console.log('❌ Users table:', userError.message)
} else {
  console.log(`✅ Users table: exists (${users?.length || 0} rows)`)
}
