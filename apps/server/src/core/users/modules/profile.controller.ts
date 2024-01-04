import { Controller, Get } from '@nestjs/common'
import { IdParam } from '../../../common/decorators'


@Controller('/users/:id/profile')
class ProfileController {
    
    constructor() {}
    
    @Get('/info')
    getProfileInfo(@IdParam() userId: number) {
    
    }
    
    @Get('chart')
    getProfileChart(@IdParam() userId: number) {
    
    }
    
}

export default ProfileController