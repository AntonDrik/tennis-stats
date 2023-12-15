import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { CreateTourDto, GetToursQuery, IdDto } from '@tennis-stats/dto'
import { Tour } from '@tennis-stats/entities'
import ToursService from './tours.service'


@Controller('tours')
class ToursController {
    
    constructor(private tourService: ToursService) {}
    
    @Get()
    getTours(@Query() query: GetToursQuery): Promise<Tour[]> {
        return this.tourService.getManyTours(query)
    }
    
    @Get('/active')
    getActiveTour(): Promise<Tour | null> {
        return this.tourService.getActiveTour()
    }
    
    @Post()
    createTour(@Body() dto: CreateTourDto): Promise<Tour> {
        return this.tourService.createTour(dto)
    }
    
    @Post('/finish')
    finishTour(@Body() dto: IdDto): Promise<Tour | null> {
        return this.tourService.finishTour(dto)
    }
    
    @Post('/cancel')
    cancelTour(@Body() dto: IdDto): Promise<Tour> {
        return this.tourService.cancelTour(dto)
    }
    
}

export default ToursController