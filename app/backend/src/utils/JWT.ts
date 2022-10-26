import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

export interface IJwt {
  username: string;
  email: string;
}

export default class Jwt {
  private secret: string = process.env.JWT_SECRET || 'secret';
  public encode = (payload: IJwt) => {
    const enconded = jwt.sign(payload, this.secret);
    return enconded;
  };
}
