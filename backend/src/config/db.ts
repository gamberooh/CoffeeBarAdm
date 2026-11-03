import mongoose from 'mongoose';

export function getMongoUri(): string {
  const host = process.env.MONGO_HOST?.toString().trim();
  const port = process.env.MONGO_PORT?.toString().trim();
  const db = process.env.MONGO_DATABASE?.toString().trim();
  const user = process.env.MONGO_USER?.toString().trim();
  const pass = process.env.MONGO_PASSWORD?.toString().trim();

  // if (user && pass) {
  //   return `mongodb://${encodeURIComponent(user)}:${encodeURIComponent(pass)}@${host}:${port}/${db}`;
  //   // return `mongodb://${encodeURIComponent(user)}:${encodeURIComponent(pass)}@${host}:${port}/${db}?authSource=admin`;
  // }
  return `mongodb://${host}:${port}/${db}`;
}

export async function connectDB(): Promise<void> {
  const uri = getMongoUri();
  try {
    await mongoose.connect(uri);
    console.log('[MongoDB] Successfully connected.');
  } catch (err: any) {
    console.error('[MongoDB] Connection error:', err.message, '- Retrying in 5s...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    return connectDB();
  }
}

export async function closeDB(): Promise<void> {
  try {
    await mongoose.connection.close();
    console.log('[MongoDB] Connection closed cleanly.');
  } catch (err: any) {
    console.error('[MongoDB] Error during connection close:', err.message);
  }
}

export default { connectDB, closeDB, getMongoUri };
