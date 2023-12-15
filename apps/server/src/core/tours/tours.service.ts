import { Injectable } from '@nestjs/common'
import { CreateTourDto, GetToursQuery, IdDto } from '@tennis-stats/dto'
import { Tour } from '@tennis-stats/entities'
import { EGameSetStatus, ETourStatus } from '@tennis-stats/types'
import { DataSource } from 'typeorm'
import { HasUnfinishedTourException, UnableCancelTourException } from '../../common/exceptions'
import { GameSetRepository } from '../game-set'
import { MatchService } from '../match'
import { MatchOrderService } from '../match-order'
import ToursRepository from './tours.repository'


@Injectable()
class ToursService {
    
    constructor(
        private repository: ToursRepository,
        private gameSetRepository: GameSetRepository,
        private dataSource: DataSource,
        private matchService: MatchService,
        private matchOrderService: MatchOrderService
    ) {}
    
    public getManyTours(query: GetToursQuery) {
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
        
        const matchesEntities = await this.matchService.getMatchesForTour(dto)
        const orderedMatches = await this.matchOrderService.applyOrder(matchesEntities)
        
        orderedMatches[0].gameSets[0].status = EGameSetStatus.READY_TO_START
        
        const tourEntity = this.repository.createEntity(dto, orderedMatches)
        
        await this.dataSource.transaction(async (manager) => {
            await manager.save(tourEntity)
        })
        
        return tourEntity
    }
    
    public async finishTour(dto: IdDto): Promise<Tour | null> {
        const tour = await this.repository.findById(dto.id)
        
        if (!tour.isCanFinish()) {
            return null
        }
        
        tour.status = ETourStatus.FINISHED
        await tour.save()
        
        return tour
    }
    
    public async cancelTour(dto: IdDto): Promise<Tour> {
        const tour = await this.repository.findById(dto.id)
        
        await this.dataSource
            .transaction(async (manager) => {
                await this.gameSetRepository.cancelAllUnfinished(tour, manager)
                await this.repository.cancelTour(tour, manager)
            })
            .catch((err: Error) => {
                throw new UnableCancelTourException(err.message)
            })
        
        return tour
    }
    
}


export default ToursService