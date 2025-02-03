import { Module } from '@nestjs/common/decorators';
import { MatchModule } from '../../../match';

import ProfileController from './controllers/profile.controller';
import ProfileService from './services/profile.service';

@Module({
  imports: [MatchModule],
  controllers: [ProfileController],
  providers: [ProfileService],
})
class ProfileModule {}

export default ProfileModule;
