import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './models/user';

const app = express();
const PORT = Number(process.env.PORT) || 8000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit';

app.use(express.json());
app.use('/api/users', userRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB on', MONGO_URI);
    app.listen(PORT, () => {
      console.log(`OctoFit backend listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  }
}

start();
