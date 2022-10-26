import * as bcrypt from 'bcryptjs';
import Users from '../services/Users';
import JWT from '../utils/JWT';

export interface messageLogin {
  code: number;
  message: string;
  value: string;
}

export default class UsersController {
  constructor(private _UsersService = new Users()) {}

  public userLogin = async (email: string, password: string): Promise<messageLogin> => {
    const result = await this._UsersService.findUser(email);
    let comparePassword = false;
    if (result) {
      comparePassword = bcrypt.compareSync(password, result.password);
      if (comparePassword) {
        const jwt = new JWT();
        const token = jwt.encode({
          username: result.username, email: result.email });
        return { code: 200, message: 'token', value: token };
      }
    }
    return { code: 401, message: 'message', value: 'Incorrect email or password' };
  };
}
