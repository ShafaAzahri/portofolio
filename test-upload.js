const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function testUpload() {
  const fileContent = Buffer.from('test image content');
  const { data, error } = await supabase.storage
    .from('portfolio-images')
    .upload(`test-${Date.now()}.txt`, fileContent, {
      contentType: 'text/plain'
    });
    
  if (error) {
    console.error('Upload error:', error);
  } else {
    console.log('Upload success:', data);
  }
}

testUpload();
