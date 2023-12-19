import { Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Query } from '@nestjs/common'
import { CreateTourDto, GetToursQuery, IdDto } from '@tennis-stats/dto'
import { Tour } from '@tennis-stats/entities'
import { IdParam } from '../../common/decorators'
import ToursService from './tours.service'


@Controller('tours')
class ToursController {
    
    constructor(private tourService: ToursService) {}
    
    @Get()
    getToursList(@Query() query: GetToursQuery): Promise<Tour[]> {
        return this.tourService.getToursList(query)
    }
    
    @Get('/:id')
    getTour(@IdParam() id: number) {
        return this.tourService.getTour(id)
    }
    
    @Post()
    createTour(@Body() dto: CreateTourDto): Promise<Tour> {
        return this.tourService.createTour(dto)
    }
    
    @Post('/cancel')
    cancelTour(@Body() dto: IdDto): Promise<Tour> {
        return this.tourService.cancelTour(dto)
    }
    
    @Delete()
    deleteTour(@Body() dto: IdDto) {
        console.log(dto)
        
        throw new HttpException('Not implemented', HttpStatus.NOT_IMPLEMENTED)
    }
    
}

export default ToursController