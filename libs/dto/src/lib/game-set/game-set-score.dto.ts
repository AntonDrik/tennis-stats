import { TScore } from '@tennis-stats/types'
import { IsNumber, Max, Min } from 'class-validator'

class GameSetScoreDto {
    
    @IsNumber()
    @Min(0)
    @Max(20)
    player1Score: TScore
    
    @IsNumber()
    @Min(0)
    @Max(20)
    player2Score: TScore
    
}

export default GameSetScoreDto