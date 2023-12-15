import { IMatchOrder } from '@tennis-stats/types'
import {
    BaseEntity, Column,
    Entity,
    ManyToOne
} from 'typeorm'
import { Match } from './match.entity'
import { User } from './user.entity'


@Entity()
export class MatchOrder extends BaseEntity implements IMatchOrder {
    
    @Column('int', { primary: true })
    order: number
    
    @ManyToOne(() => User, { eager: true, cascade: true })
    user1: User
    
    @ManyToOne(() => User, { eager: true, cascade: true })
    user2: User
    
    
    public isEqual(matchEntity: Match): boolean {
        const isUser1Equal = matchEntity.player1.user.id === this.user1.id
        const isUser2Equal = matchEntity.player2.user.id === this.user2.id
        
        return isUser1Equal && isUser2Equal
    }
}