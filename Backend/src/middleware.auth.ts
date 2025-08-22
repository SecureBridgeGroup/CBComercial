import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthReq extends Request {
  userId?: string;
}

export const auth = (req: AuthReq, res: Response, next: NextFunction) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET! as string) as { sub: string };
    req.userId = decoded.sub;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
