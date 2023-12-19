import { IsIn, IsString } from 'class-validator'


class SortQuery<K = string> {
    
    @IsString()
    key: K
    
    @IsString()
    @IsIn(['ASC', 'DESC'])
    order: 'ASC' | 'DESC'
    
}

export default SortQuery