import { Transform } from 'class-transformer'
import { IsNumber } from 'class-validator'


class GetUsersScoreDiffQuery {
    
    @IsNumber({allowNaN: false})
    @Transform(({ value }) => Number(value))
    user1Id: number
    
    @IsNumber({allowNaN: false})
    @Transform(({ value }) => Number(value))
    user2Id: number
    
}

export default GetUsersScoreDiffQuery