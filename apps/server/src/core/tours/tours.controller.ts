import { Body, Controller, Get, Post } from '@nestjs/common'
import { CreateTourDto } from '@tennis-stats/dto'
import { ToursService } from './tours.service'


@Controller('tours')
export class ToursController {
    
    constructor(private tourService: ToursService) {}
    
    @Get()
    getAllTours() {
        return this.tourService.getAllTours()
    }
    
    @Post()
    createTour(@Body() dto: CreateTourDto) {
        return this.tourService.createTour(dto)
    }
    
}
