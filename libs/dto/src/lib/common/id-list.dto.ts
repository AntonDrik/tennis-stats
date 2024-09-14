import { IsNumber } from 'class-validator'


class IdListDto {
    
    @IsNumber({}, { each: true })
    id: number[]
    
}

export default IdListDto