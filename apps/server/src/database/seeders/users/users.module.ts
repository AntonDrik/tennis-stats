import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User, UserAuth } from '@tennis-stats/entities'
import { UserSeederService } from './users.service'


@Module({
    imports: [TypeOrmModule.forFeature([User, UserAuth])],
    providers: [UserSeederService],
    exports: [UserSeederService]
})
export class UserSeederModule {}
