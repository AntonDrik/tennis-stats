import { EGameSetStatus } from '@tennis-stats/types'
import { IsIn } from 'class-validator'
import { IdDto } from '../../index'


class FinishGameSetDto extends IdDto {
    
    @IsIn([EGameSetStatus.CANCELED, EGameSetStatus.FINISHED])
    status: EGameSetStatus.CANCELED | EGameSetStatus.FINISHED
    
}

export default FinishGameSetDto