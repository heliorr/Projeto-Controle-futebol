import Teams from '../database/models/Teams';

export interface ITeams {
  id: number;
  teamName: string;
}

export default class UsersService {
  private teams = Teams;

  public findallTeams = async (): Promise<ITeams[]> => {
    const teams = await this.teams.findAll();
    return teams;
  };
}
