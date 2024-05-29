import { ConfigService } from '@nestjs/config'
import {
    RatingHistory,
    User,
    UserAuth,
    GameSet,
    Permission,
    Tour,
    Player,
    MatchOrder,
    Match
} from '@tennis-stats/entities'
import { config } from 'dotenv'
import { join } from 'path'
import { DataSource } from 'typeorm'
import { IEnvVariables } from '../config/env'


config({ path: `${join(__dirname)}/assets/.env` })
const configService = new ConfigService<IEnvVariables>()

export default new DataSource({
    type: 'mysql',
    url: configService.get('DB_URL'),
    entities: [RatingHistory, User, UserAuth, GameSet, Permission, Tour, Player, MatchOrder, Match],
    migrations: [`${join(__dirname)}/files/*.js`],
    synchronize: false
})
