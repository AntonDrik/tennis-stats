import { Injectable } from '@nestjs/common'
import { CreateTourDto, GetToursQuery } from '@tennis-stats/dto'
import { Tour } from '@tennis-stats/entities'
import { DataSource } from 'typeorm'
import { HasUnfinishedTourException } from '../../common/exceptions'
import { GameSetsService } from '../game-sets'
import ToursRepository from './tours.repository'


@Injectable()
class ToursService {
    
    constructor(
        private repository: ToursRepository,
        private dataSource: DataSource,
        private gameSetsService: GameSetsService
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
        
        const gameSets = await this.gameSetsService.getGameSetsEntities(dto)
        const tourEntity = this.repository.getTourEntity(dto, gameSets)
        
        await this.dataSource.transaction(async (manager) => {
            await manager.save(gameSets)
            await manager.save(tourEntity)
        })
        
        return tourEntity
    }
    
    public cancelTour() {
    
    }
    
}


export default ToursService