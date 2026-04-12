const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('--- Supabase Connection Diagnostic ---');
  console.log('Target URL:', supabaseUrl);
  
  try {
    const { data, error } = await supabase.from('todos').select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('Connection Status: FAILED');
      console.error('Error Details:', error.message);
      process.exit(1);
    }
    
    console.log('Connection Status: SUCCESSFUL');
    console.log('Verified: System Link Established');
  } catch (err) {
    console.error('System Exception:', err.message);
    process.exit(1);
  }
}

testConnection();
