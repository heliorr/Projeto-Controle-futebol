import * as bcrypt from 'bcryptjs';
import Users from '../services/Users';
import JWT, { decode } from '../utils/JWT';

export interface messageLogin {
  code: number;
  message: string;
  value: string;
}

export default class UsersController {
  public jwtClass = new JWT();

  constructor(private _UsersService = new Users()) {}

  public userLogin = async (email: string, password: string): Promise<messageLogin> => {
    const result = await this._UsersService.findUser(email);
    let comparePassword = false;
    if (result) {
      comparePassword = bcrypt.compareSync(password, result.password);
      if (comparePassword) {
        const token = this.jwtClass.encode({
          username: result.username, email: result.email, role: result.role });
        return { code: 200, message: 'token', value: token };
      }
    }
    return { code: 401, message: 'message', value: 'Incorrect email or password' };
  };

  public userRole = async (authorization: string | undefined): Promise<messageLogin> => {
    const decoded = decode(authorization);
    if (decoded) {
      return { code: 200, message: 'role', value: decoded.role };
    }
    return { code: 401, message: 'message', value: 'Token must be a valid token' };
  };
}
