import { Module } from '@nestjs/common/decorators'
import { MatchModule } from '../../../tours/modules/match'

import { UsersModule } from '../../index'
import ProfileController from './profile.controller'
import ProfileService from './profile.service'


@Module({
    imports: [
        UsersModule,
        MatchModule
    ],
    controllers: [ProfileController],
    providers: [ProfileService]
})
class ProfileModule {}

export default ProfileModule