const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function fixRLS() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  try {
    await client.connect();
    
    // Drop existing policies if they exist to avoid errors
    try { await client.query(`DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects`); } catch(e) {}
    try { await client.query(`DROP POLICY IF EXISTS "Allow public update" ON storage.objects`); } catch(e) {}
    try { await client.query(`DROP POLICY IF EXISTS "Allow public delete" ON storage.objects`); } catch(e) {}

    // Create new policies
    await client.query(`
      CREATE POLICY "Allow public uploads" ON storage.objects
      FOR INSERT TO public WITH CHECK (bucket_id = 'portfolio-images');
    `);
    console.log('Insert policy created');

    await client.query(`
      CREATE POLICY "Allow public update" ON storage.objects
      FOR UPDATE TO public USING (bucket_id = 'portfolio-images');
    `);
    console.log('Update policy created');

    await client.query(`
      CREATE POLICY "Allow public delete" ON storage.objects
      FOR DELETE TO public USING (bucket_id = 'portfolio-images');
    `);
    console.log('Delete policy created');

  } catch(e) { 
    console.error('Error:', e); 
  } finally {
    await client.end();
  }
}

fixRLS();
