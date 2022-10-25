import Users from '../database/models/Users';

export interface ILogin {
  username: string;
  email: string;
  password: string;
  role?: string;
}

export default class UsersService {
  private users = Users;

  public findUser = async (email: string): Promise<ILogin | null> => {
    const user = await this.users.findOne({ where: { email } });
    return user;
  };
}
