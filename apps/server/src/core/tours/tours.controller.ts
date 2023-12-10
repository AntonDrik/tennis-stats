import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { CreateTourDto, GetToursQuery } from '@tennis-stats/dto'
import { Tour } from '@tennis-stats/entities'
import ToursService from './tours.service'


@Controller('tours')
class ToursController {
    
    constructor(private tourService: ToursService) {}
    
    @Get()
    getTours(@Query() query: GetToursQuery): Promise<Tour[]> {
        return this.tourService.getTours(query)
    }
    
    @Get('/active')
    getActiveTour(): Promise<Tour | null> {
        return this.tourService.getActiveTour()
    }
    
    @Post()
    createTour(@Body() dto: CreateTourDto) {
        return this.tourService.createTour(dto)
    }
    
}

export default ToursController