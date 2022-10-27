import LeaderBoard from '../services/LeaderBoard';

export default class LeaderBoardController {
  constructor(private _LeaderBoardService = new LeaderBoard()) {}

  public findLeaderBoardHome = async () => {
    const result = await this._LeaderBoardService.findLeaderBoardHome();
    return { code: 200, value: result };
  };
}
