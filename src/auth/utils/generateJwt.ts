import * as jwt from 'jsonwebtoken';

export const generateJwt = (id: string, role: string) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET!, { expiresIn: '7d' });
};
