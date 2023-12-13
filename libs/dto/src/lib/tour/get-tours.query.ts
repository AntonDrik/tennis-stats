import { ETourStatus } from '@tennis-stats/types'
import { Transform } from 'class-transformer'
import { IsEnum, IsNumber, IsOptional } from 'class-validator'


class GetToursQuery {
    
    @IsOptional()
    @IsNumber()
    @Transform(({value}) => Number(value))
    id?: number | string
    
    @IsOptional()
    @IsEnum(ETourStatus)
    status?: ETourStatus
    
}

export default GetToursQuery