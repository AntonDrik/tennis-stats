import { HttpException, Injectable } from '@nestjs/common';
import { User } from '@tennis-stats/entities';
import { DataSource, Equal, FindOneOptions, In } from 'typeorm';
import { UserNotFoundException } from '../common/exceptions';
import { BaseRepository } from '../common/utils';

@Injectable()
class UsersRepository extends BaseRepository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource);
  }

  public findByLogin(login: string) {
    return this.findOne({
      relations: ['auth'],
      where: {
        auth: { login: Equal(login) },
      },
    });
  }

  public async findById(
    id: number,
    findOptions?: FindOneOptions<User>,
    exception?: HttpException
  ): Promise<User> {
    const user = await this.findOne({
      where: { ...findOptions?.where, id: Equal(Number(id)) },
      ...findOptions,
    });

    if (!user) {
      throw exception ?? new UserNotFoundException(id);
    }

    return user;
  }

  public async findByNickname(nickname: string): Promise<User> {
    const user = await this.findOneBy({ nickname: Equal(nickname) });

    if (!user) {
      throw new UserNotFoundException(nickname);
    }

    return user;
  }

  public findByRefreshToken(token: string): Promise<User | null> {
    return this.findOne({
      relations: ['auth'],
      where: {
        auth: {
          refreshToken: Equal(token),
        },
      },
    });
  }

  public findByIds(ids: number[]) {
    return this.findBy({
      id: In(ids),
    });
  }
}

export default UsersRepository;
