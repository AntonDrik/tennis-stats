import { Module } from '@nestjs/common/decorators'
import { UsersModule } from '../index'
import ProfileController from './profile.controller'
import ProfileService from './profile.service'


@Module({
    imports: [
        UsersModule
    ],
    controllers: [ProfileController],
    providers: [ProfileService]
})
class ProfileModule {}

export default ProfileModule