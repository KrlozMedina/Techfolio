import mongoose from "mongoose";

export async function connectTestDB() {
  if (mongoose.connection.readyState === 1) return;
  console.log('ENV:', process.env.DATABASE_URL)
  await mongoose.connect(process.env.DATABASE_URL!);
}

export async function clearTestDB() {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany({});
  }
}

export async function disconnectTestDB() {
  await mongoose.disconnect();
}
