import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Player } from '@tennis-stats/entities'
import PlayersRepository from './players.repository'
import PlayersService from './players.service'


@Module({
    imports: [TypeOrmModule.forFeature([Player])],
    controllers: [],
    providers: [PlayersService, PlayersRepository],
    exports: [PlayersService, PlayersRepository]
})
class PlayersModule {}

export default PlayersModule