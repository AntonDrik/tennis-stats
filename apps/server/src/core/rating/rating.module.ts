import { Module } from '@nestjs/common/decorators'
import { UsersModule } from '../users'
import RatingService from './rating.service'


@Module({
    imports: [
        UsersModule
    ],
    controllers: [],
    providers: [RatingService],
    exports: [RatingService]
})
class RatingModule {}

export default RatingModule