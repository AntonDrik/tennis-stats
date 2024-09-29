import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission, User, UserAuth } from '@tennis-stats/entities';
import { EPermission } from '@tennis-stats/types';
import { Repository } from 'typeorm';
import { ISeedUser, users } from './data';

@Injectable()
export class UserSeederService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  public create(): Array<Promise<User | null>> {
    return users.map(async (user) =>
      this.userRepository
        .findOne({
          relations: ['auth'],
          where: {
            auth: { login: user.auth.login },
          },
        })
        .then(async (dbUser) => {
          if (dbUser) {
            return Promise.resolve(null);
          }

          const userForSave = await this.getEntity(user);
          const saveResult = await this.userRepository.save(userForSave);

          return Promise.resolve(saveResult);
        })
        .catch((error) => Promise.reject(error))
    );
  }

  private async getEntity(seedUser: ISeedUser) {
    const auth = new UserAuth();
    auth.login = seedUser.auth.login;
    auth.password = seedUser.auth.password;
    auth.refreshToken = seedUser.auth.refreshToken;

    const user = new User();
    user.nickname = seedUser.nickname;
    user.auth = auth;
    user.permissions = this.getPermissionEntities(seedUser.permissions);

    return user;
  }

  private getPermissionEntities(permissions: EPermission[]) {
    return permissions.map((permission) => {
      const entity = new Permission();
      entity.value = permission;

      return entity;
    });
  }
}
