import mongoose from 'mongoose';

export function getMongoUri(): string {
  // if (process.env.DB_URI) return process.env.DB_URI;
  // if (process.env.MONGO_URI) return process.env.MONGO_URI;

  const host = process.env.MONGO_HOST || 'mongo_coffebaradm';
  const port = process.env.MONGO_PORT || '27017';
  const db = process.env.MONGO_DATABASE || 'coffebar';
  const user = process.env.MONGO_USER;
  const pass = process.env.MONGO_PASSWORD;

  if (user && pass) {
    return `mongodb://${encodeURIComponent(user)}:${encodeURIComponent(pass)}@${host}:${port}/${db}`;
    // return `mongodb://${encodeURIComponent(user)}:${encodeURIComponent(pass)}@${host}:${port}/${db}?authSource=admin`;
  }
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
