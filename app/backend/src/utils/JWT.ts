import * as jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import 'dotenv/config';

export interface IJwt {
  username: string;
  email: string;
  role: string;
}

const secret: string = process.env.JWT_SECRET || 'secret';
export default class Jwt {
  public encode = (payload: IJwt) => {
    const enconded = jwt.sign(payload, secret);
    return enconded;
  };
}

export const decode = (key: string | undefined) => {
  if (key) {
    const decoded = jwt.verify(key, secret) as jwt.JwtPayload;
    return decoded;
  }
  return false;
};

export const valitadeToken = (req: Request, res: Response, next: NextFunction) => {
  const key = req.header('Authorization');
  if (!key) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  try {
    jwt.verify(key, secret);
  } catch (e) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
};
