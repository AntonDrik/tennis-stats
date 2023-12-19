import { Module } from '@nestjs/common/decorators'
import AuthController from './auth.controller'


@Module({
    imports: [],
    controllers: [AuthController],
    providers: [],
    exports: []
})
class AuthModule {}

export default AuthModule