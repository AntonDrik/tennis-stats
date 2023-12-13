import { Injectable } from '@nestjs/common'
import { CreateTourDto, GetToursQuery, IdDto } from '@tennis-stats/dto'
import { Tour } from '@tennis-stats/entities'
import { DataSource } from 'typeorm'
import {
    HasUnfinishedTourException,
    TourNotFoundException,
    UnableCancelTourException
} from '../../common/exceptions'
import { GameSetsRepository } from '../game-sets'
import { MatchesService } from '../matches'
import ToursRepository from './tours.repository'


@Injectable()
class ToursService {
    
    constructor(
        private repository: ToursRepository,
        private gameSetsRepository: GameSetsRepository,
        private dataSource: DataSource,
        private matchesService: MatchesService
    ) {}
    
    public getTours(query: GetToursQuery) {
        return this.repository.getToursByQuery(query)
    }
    
    public getActiveTour(): Promise<Tour | null> {
        return this.repository.getActiveTour()
    }
    
    public async createTour(dto: CreateTourDto): Promise<Tour> {
        const activeTour = await this.getActiveTour()
        
        if (activeTour) {
            throw new HasUnfinishedTourException()
        }
        
        const matchesEntities = await this.matchesService.getMatchesEntities(dto)
        const tourEntity = this.repository.getTourEntity(dto, matchesEntities)
        
        await this.dataSource.transaction(async (manager) => {
            await manager.save(tourEntity)
        })
        
        return tourEntity
    }
    
    public async cancelTour(dto: IdDto): Promise<Tour> {
        const tour = await this.repository.findOneBy({ id: dto.id })
        
        if (!tour) {
            throw new TourNotFoundException()
        }
        
        await this.dataSource.transaction(async (manager) => {
            await this.gameSetsRepository.cancelAllByTour(tour, manager)
            await this.repository.cancelTour(tour, manager)
        }).catch((err: Error) => {
            throw new UnableCancelTourException(err.message)
        })
        
        return tour
    }
    
}


export default ToursService