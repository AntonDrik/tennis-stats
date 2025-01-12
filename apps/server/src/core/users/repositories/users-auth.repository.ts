import { Injectable } from '@nestjs/common';
import { UserAuth } from '@tennis-stats/entities';
import { DataSource, Equal } from 'typeorm';
import { BaseRepository } from '../../../common/utils';

@Injectable()
class UsersAuthRepository extends BaseRepository<UserAuth> {
  constructor(dataSource: DataSource) {
    super(UserAuth, dataSource);
  }

  public async updateRefreshToken(userId: number, token: string | null) {
    const authEntity = await this.findOne({
      relations: ['user'],
      where: {
        user: { id: Equal(Number(userId)) },
      },
    });

    if (authEntity) {
      authEntity.refreshToken = token;
      await authEntity.save();
    }
  }
}

export default UsersAuthRepository;
