import { ArrayMaxSize, ArrayMinSize, IsNumber, Max, Min } from 'class-validator'


export class CreateTourDto {
    
    @IsNumber()
    @Max(5, { message: 'Максимум 5 сетов' })
    @Min(1, { message: 'Минимум 1 сет' })
    setsCount: number
    
    @IsNumber({}, { each: true })
    @ArrayMaxSize(10, { message: 'Максимум 10 игроков' })
    @ArrayMinSize(2, { message: 'Минимум 2 игрока' })
    playersIds: number[]
    
}