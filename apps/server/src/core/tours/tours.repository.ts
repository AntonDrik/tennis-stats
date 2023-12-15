import { Injectable } from '@nestjs/common'
import { CreateTourDto, GetToursQuery } from '@tennis-stats/dto'
import { Match, Tour } from '@tennis-stats/entities'
import { ETourStatus } from '@tennis-stats/types'
import { DataSource, EntityManager, Repository } from 'typeorm'
import { TourNotFoundException } from '../../common/exceptions'


@Injectable()
class ToursRepository extends Repository<Tour> {
    
    constructor(dataSource: DataSource) {
        super(Tour, dataSource.createEntityManager())
    }
    
    public async findById(id: number): Promise<Tour> {
        const tour = await this.findOneBy({ id })
        
        if (!tour) {
            throw new TourNotFoundException()
        }
        
        return tour as Tour
    }
    
    public getToursByQuery(query: GetToursQuery): Promise<Tour[]> {
        const builder = this.createQueryBuilder('tour')
            .leftJoinAndSelect('tour.matches', 'matches')
            .leftJoinAndSelect('matches.player1', 'matchPlayer1')
            .leftJoinAndSelect('matches.player2', 'matchPlayer2')
            .leftJoinAndSelect('matchPlayer1.user', 'matchPlayerUser1')
            .leftJoinAndSelect('matchPlayer2.user', 'matchPlayerUser2')
            .leftJoinAndSelect('matches.gameSets', 'gameSets')
            .leftJoinAndSelect('gameSets.player1', 'player1')
            .leftJoinAndSelect('gameSets.player2', 'player2')
            .leftJoinAndSelect('player1.user', 'user1')
            .leftJoinAndSelect('player2.user', 'user2')
        
        if (Number.isFinite(query.id)) {
            builder.where('tour.id = :id', { id: query.id })
        }
        
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
    
    public createEntity(dto: CreateTourDto, matchEntities: Match[]): Tour {
        const tour = new Tour()
        
        tour.date = new Date()
        tour.matches = matchEntities
        tour.setsCount = dto.setsCount
        tour.status = ETourStatus.ACTIVE
        
        return tour
    }
    
    public cancelTour(tour: Tour, transactionManager: EntityManager) {
        return transactionManager.update(
            Tour,
            { id: tour.id },
            { status: ETourStatus.CANCELED }
        )
    }
    
}

export default ToursRepository