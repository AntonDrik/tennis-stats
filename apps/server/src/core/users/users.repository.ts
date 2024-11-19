import { HttpException, Injectable } from '@nestjs/common';
import { User } from '@tennis-stats/entities';
import { DataSource, Equal, In } from 'typeorm';
import { UserNotFoundException } from '../../common/exceptions';
import { BaseRepository } from '../../common/utils';

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

  public async findById(id: number, exception?: HttpException): Promise<User> {
    const user = await this.findOneBy({ id: Equal(Number(id)) });

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

  public findByIds(ids: number[]) {
    return this.findBy({
      id: In(ids),
    });
  }
}

export default UsersRepository;
