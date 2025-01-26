import { Module } from '@nestjs/common/decorators';
import { MatchModule } from '../../../match';

import ProfileController from './profile.controller';
import ProfileService from './profile.service';

@Module({
  imports: [MatchModule],
  controllers: [ProfileController],
  providers: [ProfileService],
})
class ProfileModule {}

export default ProfileModule;
