import { ETourStatus } from '@tennis-stats/types'
import { IsEnum, IsOptional } from 'class-validator'


class GetToursQuery {
    
    @IsOptional()
    @IsEnum(ETourStatus)
    status?: ETourStatus
    
}

export default GetToursQuery