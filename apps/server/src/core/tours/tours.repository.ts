import { Injectable } from '@nestjs/common'
import { CreateTourDto, GetToursQuery } from '@tennis-stats/dto'
import { GameSet, Tour } from '@tennis-stats/entities'
import { ETourStatus } from '@tennis-stats/types'
import { DataSource, Repository } from 'typeorm'


@Injectable()
class ToursRepository extends Repository<Tour> {
    
    constructor(dataSource: DataSource) {
        super(Tour, dataSource.createEntityManager())
    }
    
    public getToursByQuery(query: GetToursQuery): Promise<Tour[]> {
        const builder = this.createQueryBuilder('tour')
            .leftJoinAndSelect('tour.gameSets', 'gameSets')
            .leftJoinAndSelect('gameSets.player1', 'player1')
            .leftJoinAndSelect('gameSets.player2', 'player2')
            .leftJoinAndSelect('player1.user', 'user1')
            .leftJoinAndSelect('player2.user', 'user2')
        
        if (query.status) {
            builder.where('tour.status = :status', { status: query.status })
        }
        
        return builder.getMany()
    }
    
    public getActiveTour() {
        return this.findOneBy({
            status: ETourStatus.ACTIVE
        })
    }
    
    public getTourEntity(dto: CreateTourDto, gameSets: GameSet[]): Tour {
        const tour = new Tour()
        
        tour.date = new Date()
        tour.gameSets = gameSets
        tour.setsCount = dto.setsCount
        tour.status = ETourStatus.ACTIVE
        
        return tour
    }
    
    
}

export default ToursRepository