import { Transform } from 'class-transformer'
import { IsBoolean, IsNumber, IsOptional } from 'class-validator'


class GetToursQuery {
    
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    id?: number | string
    
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    sortByDate?: boolean
    
}

export default GetToursQuery