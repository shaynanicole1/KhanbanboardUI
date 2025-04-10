import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  import { Request, Response, NextFunction } from 'express';
  import jwt from 'jsonwebtoken';
  
  interface JwtPayload {
    userId: string;
    username: string;
    iat?: number;
    exp?: number;
  }
  
  export interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
  }
  
  export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1]; // Bearer <token>
  
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
  
      // ✅ Add user data to request object
      req.user = decoded;
  
      next(); // Proceed to the protected route
    } catch (err) {
      return res.status(401).json({ error: 'Invalid or expired token.' });
    }
  };
  
};
