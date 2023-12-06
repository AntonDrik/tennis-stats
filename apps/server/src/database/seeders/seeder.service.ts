import { Injectable } from '@nestjs/common'
import chalk from 'chalk'
import { LoggerService } from '../../common/utils'
import { UserSeederService } from './users/users.service'


/**
 * Данный модуль добавляет заранее заготовленные данные в базу данных
 */
@Injectable()
class SeederService {
    
    private logger = new LoggerService('Seeder')
    
    constructor(
        private readonly userSeederService: UserSeederService
    ) {}
    
    async seed() {
        try {
            await this.users()
        } catch {
            this.logger.error('Seeding error')
        }
    }
    
    async users() {
        return this.handleEntitiesPromises(
            this.userSeederService.create(),
            'users'
        )
    }
    
    private handleEntitiesPromises<T>(promise: Promise<T>[], caption: string) {
        return Promise.all(promise)
            .then((users) => {
                const { length } = users.filter((user) => user)
                if (length) {
                    this.logger.log(`Created ${caption} : ${length}`, chalk.green)
                }
            })
            .catch(error => {
                this.logger.error(`Failed seeding ${caption}...`)
                return Promise.reject(error)
            })
    }
}

export default SeederService