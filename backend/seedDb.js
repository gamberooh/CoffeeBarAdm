import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

async function seedDatabase() {
  const { MONGO_HOST, MONGO_PORT, MONGO_DATABASE, MONGO_USER, MONGO_PASSWORD } = process.env;

  const missingVariables = Object.entries({ MONGO_HOST, MONGO_PORT, MONGO_DATABASE })
    .filter(([, value]) => !value?.trim())
    .map(([name]) => name);

  if (missingVariables.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVariables.join(', ')}`);
  }

  // 2. Ripristinato il controllo delle credenziali
  if (Boolean(MONGO_USER) !== Boolean(MONGO_PASSWORD)) {
    throw new Error('Set both MONGO_USER and MONGO_PASSWORD when MongoDB authentication is enabled.');
  }

  const productsPath = path.join(__dirname, 'seed', 'products.json');
  const products = JSON.parse(await readFile(productsPath, 'utf8'));
  if (!Array.isArray(products) || products.length === 0) {
    throw new Error('The seed file must contain at least one product.');
  }

  // 3. Ripristinata la creazione della stringa con le credenziali
  const credentials = MONGO_USER && MONGO_PASSWORD
    ? `${encodeURIComponent(MONGO_USER)}:${encodeURIComponent(MONGO_PASSWORD)}@`
    : '';
    
  // Aggiunto l'authSource=admin che è fondamentale per gli utenti root creati da MONGO_INITDB
  const authSource = credentials ? '?authSource=admin' : '';
  
  // 4. Inseriti credentials e authSource nell'URI
  const client = new MongoClient(
    `mongodb://${credentials}${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}${authSource}`
  );

  try {
    await client.connect();
    const collection = client.db(MONGO_DATABASE).collection('beverages');
    const result = await collection.bulkWrite(
      products.map(product => ({
        updateOne: {
          filter: { title: product.title },
          update: { $set: product },
          upsert: true,
        },
      })),
      { ordered: true },
    );

    console.log(
      `Seed completed: ${result.upsertedCount} inserted, ${result.modifiedCount} updated.`,
    );
  } finally {
    await client.close();
  }
}

seedDatabase().catch(error => {
  console.error('Product seed failed:', error);
  process.exitCode = 1;
});