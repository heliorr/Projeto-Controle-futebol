import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { ILogin } from '../services/Users';

export default class Jwt {
  private secret: string = process.env.JWT_SECRET || 'secret';
  public encode = (payload: ILogin) => {
    const enconded = jwt.sign(payload, this.secret);
    return enconded;
  };
}
