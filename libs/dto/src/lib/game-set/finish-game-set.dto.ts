import { EGameSetStatus } from '@tennis-stats/types'
import { IsIn } from 'class-validator'
import GameSetScoreDto from './game-set-score.dto'


class FinishGameSetDto extends GameSetScoreDto {
    
    @IsIn([EGameSetStatus.CANCELED, EGameSetStatus.FINISHED])
    status: EGameSetStatus.CANCELED | EGameSetStatus.FINISHED
    
}

export default FinishGameSetDto