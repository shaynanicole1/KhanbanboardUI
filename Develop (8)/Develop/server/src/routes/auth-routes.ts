import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  import { Request, Response } from 'express';
  import bcrypt from 'bcrypt';
  import jwt from 'jsonwebtoken';
  
  // Replace this with your actual DB call
  const users = [
    {
      id: '1',
      username: 'admin',
      passwordHash: await bcrypt.hash('password123', 10), // example hash
    },
  ];
  
  export const loginHandler = async (req: Request, res: Response) => {
    const { username, password } = req.body;
  
    // 🔍 Find user by username
    const user = users.find((u) => u.username === username);
  
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  
    // 🔐 Compare password
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  
    // ✅ Return JWT token if password is correct
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1h',
      }
    );
  
    return res.json({ token });
  };
  
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
