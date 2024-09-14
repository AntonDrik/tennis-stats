import { ConfigService } from '@nestjs/config';
import {
  GameSet,
  Match,
  MatchOrder,
  Permission,
  Player,
  PlayerStat,
  RatingHistory,
  StatsDictionary,
  Tour,
  User,
  UserAuth
} from '@tennis-stats/entities';
import { config } from 'dotenv';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { IEnvVariables } from '../config/env';


config({ path: `${join(__dirname)}/assets/.env` });
const configService = new ConfigService<IEnvVariables>();

export default new DataSource({
  type: 'mysql',
  url: 'mysql://root:gjgjrfntgtnkm1245@localhost:3306/tennis-stats',
  entities: [RatingHistory, User, UserAuth, GameSet, Permission, Tour, Player, MatchOrder, Match, PlayerStat, StatsDictionary],
  migrations: [`${join(__dirname)}/files/*.js`],
  synchronize: false
});
