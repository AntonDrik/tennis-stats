import {Logger, Module} from '@nestjs/common'
import SqliteProviderModule from '../provider.module'
import SeederService from './seeder.service'
import {UserSeederModule} from "./users/users.module";

@Module({
	imports: [SqliteProviderModule, UserSeederModule],
	providers: [Logger, SeederService],
})
export default class SeederModule {}
