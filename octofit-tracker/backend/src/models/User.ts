import { Router } from 'express';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: () => new Date() }
});

const User = mongoose.model('User', userSchema);
const router = Router();

router.get('/', async (req, res) => {
  const users = await User.find().limit(10).lean();
  res.json(users);
});

router.post('/', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

export default router;
