import { Module } from '@nestjs/common/decorators'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Permission } from '@tennis-stats/entities'


@Module({
    imports: [
        TypeOrmModule.forFeature([Permission])
    ],
    controllers: [],
    providers: [],
    exports: []
})
class PermissionsModule {}

export default PermissionsModule