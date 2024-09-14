import { Injectable } from '@nestjs/common';
import { User } from '@tennis-stats/entities';
import { DataSource, Equal, In } from 'typeorm';
import { UserNotFoundException } from '../../common/exceptions';
import { BaseRepository } from '../../common/utils';


@Injectable()
class UsersRepository extends BaseRepository<User> {

  constructor(dataSource: DataSource) {
    super(User, dataSource);
  }

  public findByRefreshToken(token: string) {
    return this.findOne({
      relations: ['auth'],
      where: {
        auth: {
          refreshToken: Equal(token)
        }
      }
    });
  }

  public findByLogin(login: string) {
    return this.findOne({
      relations: ['auth'],
      where: {
        auth: { login }
      }
    });
  }

  public async findById(id: number): Promise<User> {
    const user = await this.findOneBy({ id });

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  public getByIds(ids: number[]) {
    return this.findBy({
      id: In(ids)
    });
  }

}

export default UsersRepository;
