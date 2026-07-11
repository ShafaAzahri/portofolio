const { execSync } = require('child_process');
const fs = require('fs');

const envContent = fs.readFileSync('.env', 'utf8');
const lines = envContent.split(/\r?\n/);

for (const line of lines) {
    if (!line || line.startsWith('#') || !line.includes('=')) continue;
    const [key, ...rest] = line.split('=');
    const value = rest.join('=').replace(/^"|"$/g, '').trim();
    
    if (["DATABASE_URL", "DIRECT_URL", "NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"].includes(key)) {
        console.log(`Adding ${key}...`);
        try {
            execSync(`npx vercel env add ${key} production`, { input: value, stdio: ['pipe', 'inherit', 'inherit'] });
            console.log(`Added ${key}`);
        } catch (e) {
            console.error(`Failed to add ${key}`, e.message);
        }
    }
}
