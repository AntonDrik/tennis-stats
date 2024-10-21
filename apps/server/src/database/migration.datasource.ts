import {
  GameSet,
  Match,
  Permission,
  Player,
  RatingHistory,
  Tour,
  Tournament,
  TournamentLeaderboard,
  User,
  UserAuth,
} from '@tennis-stats/entities';
import { config } from 'dotenv';
import { join } from 'path';
import { DataSource } from 'typeorm';

config({ path: `${join(__dirname)}/assets/.env` });

export default new DataSource({
  type: 'mysql',
  url: 'mysql://root:gjgjrfntgtnkm1245@localhost:3306/tennis-stats',
  entities: [
    RatingHistory,
    User,
    UserAuth,
    GameSet,
    Permission,
    Tour,
    Tournament,
    TournamentLeaderboard,
    Player,
    Match,
  ],
  migrations: [`${join(__dirname)}/files/*.js`],
  synchronize: false,
});
