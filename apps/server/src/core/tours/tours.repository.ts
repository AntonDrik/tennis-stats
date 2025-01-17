import { Injectable } from '@nestjs/common'
import { CreateTourDto, GetToursQuery } from '@tennis-stats/dto'
import { Match, Tour } from '@tennis-stats/entities'
import { parseISO } from 'date-fns'
import { DataSource, Repository } from 'typeorm'
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
    
    public async findLast(): Promise<Tour | null> {
        const toursList = await this.find({
            order: { id: 'DESC' },
            take: 1
        })
        
        return toursList?.[0]
    }
    
    public getToursByQuery(query: GetToursQuery): Promise<Tour[]> {
        
        const builder = this.createQueryBuilder('tour')
            .leftJoinAndSelect('tour.matches', 'matches')
            .leftJoinAndSelect('matches.user1', 'matchUser1')
            .leftJoinAndSelect('matches.user2', 'matchUser2')
            .leftJoinAndSelect('matches.gameSets', 'gameSets')
            .leftJoinAndSelect('gameSets.player1', 'player1')
            .leftJoinAndSelect('gameSets.player2', 'player2')
            .leftJoinAndSelect('player1.user', 'user1')
            .leftJoinAndSelect('player2.user', 'user2')
        
        if (Number.isFinite(query.id)) {
            builder.where('tour.id = :id', { id: query.id })
        }
        
        if (query.sortByDate) {
            builder.orderBy('tour.date', 'DESC')
        }
        
        return builder.getMany()
    }
    
    public createEntity(dto: CreateTourDto, matchEntities: Match[]): Tour {
        const tour = new Tour()
        
        tour.date = parseISO(dto.date)
        tour.matches = matchEntities
        tour.setsCount = dto.setsCount
        
        return tour
    }
    
    public executeQuery<T>(query: string): Promise<T[]> {
        return this.query(query)
    }
    
}

export default ToursRepository