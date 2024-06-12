import { Injectable } from '@nestjs/common';
import { Match, MatchOrder, User } from '@tennis-stats/entities';
import { shuffleArray, uniqueCombinations } from '@tennis-stats/helpers';
import { EGameSetStatus, IMatchOrder } from '@tennis-stats/types';
import { UsersNotFoundException } from '../../common/exceptions';
import MatchOrderRepository from '../match-order/match-order.repository';
import { UsersRepository } from '../users';


/**
 * Генератор последовательности матчей
 */
@Injectable()
class MatchOrderService {

  constructor(
    private repository: MatchOrderRepository,
    private usersRepository: UsersRepository
  ) {
  }

  public async getCurrentOrder(): Promise<MatchOrder[]> {
    return await this.repository.find();
  }

  /**
   * Создаёт новую последовательность матчей для всех пользователей и записывает её в БД
   */
  public async createOrderForAllUsers() {
    const allUsers = await this.usersRepository.find();

    if (!allUsers.length) {
      throw new UsersNotFoundException();
    }

    const randomOrder = this.generateRandomOrder(allUsers);

    const entities = randomOrder.map((users, index) => {
      return this.repository.getEntity(users, index + 1);
    });

    await this.repository.clear();
    await this.repository.save(entities);

    return this.repository.find();
  }

  /**
   * Генерирует последовательность матчей для списка пользователей
   */
  public async generateOrderForUsers(usersIds: number[]): Promise<IMatchOrder[]> {
    const usersList = await this.usersRepository.getByIds(usersIds);

    const randomOrder = this.generateRandomOrder(usersList);

    return randomOrder.map((users, index) => {
      return this.repository.getEntity(users, index + 1);
    });
  }

  /**
   * Сортирует переданные матчи на основе последовательности из БД
   */
  public async applyOrder(entitiesList: Match[], setFirstAsReady = false) {
    let currentOrder = await this.getCurrentOrder();

    if (!currentOrder.length) {
      currentOrder = await this.createOrderForAllUsers();
    }

    const orderedList = this.sortByReferenceOrder(entitiesList, currentOrder);

    if (setFirstAsReady) {
      orderedList[0].gameSets[0].status = EGameSetStatus.READY_TO_START;
    }

    return orderedList;
  }

  private sortByReferenceOrder(entitiesList: Match[], reference: MatchOrder[]) {
    const tempArray = [...entitiesList];

    return tempArray.sort((a, b) => {
      const aRefOrder = reference.find((order) => order.isEqual(a))?.order ?? 0;
      const bRefOrder = reference.find((order) => order.isEqual(b))?.order ?? 0;

      return aRefOrder - bRefOrder;
    });
  }

  private generateRandomOrder(users: User[]): User[][] {
    const combinedUsers = uniqueCombinations(users);

    return shuffleArray(combinedUsers);
  }

}

export default MatchOrderService;
