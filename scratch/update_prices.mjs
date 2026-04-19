import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uwiruawgcbilucytsfev.supabase.co';
const supabaseKey = 'sb_publishable_w8PIHZLTWCJE-Q-W-U0n_g_WxGXS_-_';
const supabase = createClient(supabaseUrl, supabaseKey);

// Realistic unique prices under 49000
const possiblePrices = [28500, 31000, 32500, 34000, 36500, 38000, 39500, 41000, 42500, 45000, 46500, 48000];

async function run() {
  console.log("Fetching products...");
  const { data: products, error } = await supabase.from('products').select('*');
  if (error) {
    console.error("Error fetching:", error);
    return;
  }
  
  console.log(`Found ${products.length} products. Updating prices...`);
  
  // Shuffle the prices so they are unique if we have fewer products than prices
  const shuffledPrices = [...possiblePrices].sort(() => 0.5 - Math.random());
  
  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const newPrice = shuffledPrices[i % shuffledPrices.length];
    
    console.log(`Updating ${p.name} to ₦${newPrice}...`);
    const { error: updateError } = await supabase
      .from('products')
      .update({ price: newPrice })
      .eq('id', p.id);
      
    if (updateError) {
      console.error(`Error updating ${p.name}:`, updateError);
    }
  }
  
  console.log("Finished updating prices!");
}

run();
