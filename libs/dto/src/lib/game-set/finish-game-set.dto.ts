import { EGameSetStatus, TScore } from '@tennis-stats/types'
import { IsIn, IsNumber, Max, Min } from 'class-validator'
import { IdDto } from '../../index'


class FinishGameSetDto extends IdDto {
    
    @IsNumber()
    @Min(0)
    @Max(20)
    player1Score: TScore
    
    @IsNumber()
    @Min(0)
    @Max(20)
    player2Score: TScore
    
    @IsIn([EGameSetStatus.CANCELED, EGameSetStatus.FINISHED])
    status: EGameSetStatus.CANCELED | EGameSetStatus.FINISHED
    
}

export default FinishGameSetDto