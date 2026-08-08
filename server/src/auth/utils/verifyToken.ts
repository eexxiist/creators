import * as jwt from 'jsonwebtoken';
import { TokenPayload } from '../types/token-payload';

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
};
