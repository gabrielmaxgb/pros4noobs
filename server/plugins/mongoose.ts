import mongoose from 'mongoose';

export default defineNitroPlugin(async () => {
  const uri = useRuntimeConfig().MONGODB_URI;

  if (!uri) {
    throw new Error('❌ MONGODB_URI not set');
  }

  if (mongoose.connection.readyState >= 1) {
    console.log('✅ MongoDB already connected');
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    throw err;
  }
});
