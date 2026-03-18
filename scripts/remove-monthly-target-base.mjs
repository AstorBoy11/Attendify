import fs from 'fs';
import { MongoClient } from 'mongodb';

function readMongoUri() {
  const env = fs.readFileSync('.env', 'utf8');
  const match = env.match(/^MONGODB_URI=(.+)$/m);
  if (!match) {
    throw new Error('MONGODB_URI not found in .env');
  }
  return match[1].trim();
}

async function main() {
  const uri = readMongoUri();
  const client = new MongoClient(uri);

  await client.connect();
  const db = client.db();

  const result = await db.collection('users').updateMany(
    { monthlyTargetBase: { $exists: true } },
    { $unset: { monthlyTargetBase: '' } }
  );

  const remaining = await db.collection('users').countDocuments({
    monthlyTargetBase: { $exists: true }
  });

  console.log(
    JSON.stringify(
      {
        matched: result.matchedCount,
        modified: result.modifiedCount,
        remaining
      },
      null,
      2
    )
  );

  await client.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});