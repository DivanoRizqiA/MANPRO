const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');

    // Fix stale indexes: drop legacy username index if exists, ensure email unique index
    const conn = mongoose.connection;
    const collections = await conn.db.listCollections({ name: 'users' }).toArray();
    if (collections.length) {
      const users = conn.collection('users');
      try {
        const indexes = await users.indexes();
        const hasUsernameIndex = indexes.some(ix => ix.name === 'username_1');
        if (hasUsernameIndex) {
          await users.dropIndex('username_1');
          console.log('Dropped stale index username_1');
        }
      } catch (e) {
        console.warn('Index inspection/drop failed (non-fatal):', e.message);
      }
      try {
        await users.createIndex(
          { email: 1 },
          { unique: true, partialFilterExpression: { email: { $exists: true } } }
        );
        console.log('Ensured unique index on email');
      } catch (e) {
        console.warn('Ensure email index failed (non-fatal):', e.message);
      }
    }
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    // Exit process with failure
    process.exit(1);
  }
};

connectDB();

// Handle connection errors after initial connection
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});