import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '@tennis-stats/entities'
import { UserSeederService } from './users.service'


@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserSeederService],
    exports: [UserSeederService]
})
export class UserSeederModule {}
