import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Tour } from '@tennis-stats/entities'
import { Repository } from 'typeorm'


@Injectable()
export class ToursService {
    
    constructor(
        @InjectRepository(Tour)
        public repository: Repository<Tour>
    ) {}
    
    public getAllTours() {
        return this.repository.find()
    }
    
}
