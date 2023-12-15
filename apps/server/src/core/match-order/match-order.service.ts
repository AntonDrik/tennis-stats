import { Injectable } from '@nestjs/common'
import { Match, MatchOrder, User } from '@tennis-stats/entities'
import { shuffleArray, uniqueCombinations } from '@tennis-stats/helpers'
import { IMatchOrder } from '@tennis-stats/types'
import { UsersNotFoundException } from '../../common/exceptions'
import MatchOrderRepository from '../match-order/match-order.repository'
import { UsersRepository } from '../users'


/**
 * Генератор последовательности матчей
 */
@Injectable()
class MatchOrderService {
    
    constructor(
        private repository: MatchOrderRepository,
        private usersRepository: UsersRepository,
    ) {}
    
    public async getCurrent(): Promise<MatchOrder[]> {
        return await this.repository.find()
    }
    
    /**
     * Создаёт новую последовательности матчей для всех пользователей и записывает в БД
     */
    public async createForAllUsers() {
        const allUsers = await this.usersRepository.find()
        
        if (!allUsers.length) {
            throw new UsersNotFoundException()
        }
        
        const generatedOrder = this.generateOrder(allUsers)
        
        const entities = generatedOrder.map((users, index) => {
            return this.repository.getEntity(users, index + 1)
        })
        
        await this.repository.clear()
        await this.repository.save(entities)
        
        return this.repository.find()
    }
    
    /**
     * Генерирует последовательность матчей для списка пользователей
     */
    public async generateForUsers(usersIds: number[]): Promise<IMatchOrder[]> {
        const usersList = await this.usersRepository.getUsersByIds(usersIds)
        
        const generatedOrder = this.generateOrder(usersList)
        
        return generatedOrder.map((users, index) => {
            return this.repository.getEntity(users, index + 1)
        })
    }
    
    /**
     * Сортирует переданные матчи на основе текущей последовательности
     */
    public async applyOrder(entitiesList: Match[]) {
        let currentOrder = await this.getCurrent()
        
        if (!currentOrder.length) {
            currentOrder = await this.createForAllUsers()
        }
        
        return this.sortByReferenceOrder(entitiesList, currentOrder)
    }
    
    private sortByReferenceOrder(entitiesList: Match[], reference: MatchOrder[]) {
        const tempArray = [...entitiesList]
        
        return tempArray.sort((a, b) => {
            const aRefOrder = reference.find((order) => order.isEqual(a))?.order ?? 0
            const bRefOrder = reference.find((order) => order.isEqual(b))?.order ?? 0
            
            return aRefOrder - bRefOrder
        })
    }
    
    private generateOrder(users: User[]): User[][] {
        const combinedUsers = uniqueCombinations(users)
        
        return shuffleArray(combinedUsers)
    }
    
}

export default MatchOrderService