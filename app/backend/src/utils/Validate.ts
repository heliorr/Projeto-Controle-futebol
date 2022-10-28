import { Response, Request, NextFunction } from 'express';

const valitade = (req: Request, res: Response, next: NextFunction) => {
  const { body: { email, password } } = req;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  next();
};

export default { valitade };
