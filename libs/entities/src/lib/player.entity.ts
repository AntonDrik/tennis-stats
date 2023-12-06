import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { IPlayer, TScore } from '@tennis-stats/types'
import { GameSet } from './game-set.entity'

import { Tour } from './tour.entity'
import { User } from './user.entity'


@Entity()
export class Player extends BaseEntity implements IPlayer {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @ManyToOne(() => GameSet, { eager: true })
    gameSet: GameSet
    
    @ManyToOne(() => Tour, { eager: true })
    user: User
    
    @Column('int')
    score: TScore
    
}