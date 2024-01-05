import { Controller, Get } from '@nestjs/common'
import { IdParam } from '../../../../common/decorators'
import ProfileService from './profile.service'


@Controller('/users/:id/profile')
class ProfileController {
    
    constructor(
        private service: ProfileService
    ) {}
    
    @Get('/info')
    getProfileInfo(@IdParam() userId: number) {
        return this.service.getInfo(userId)
    }
    
}

export default ProfileController