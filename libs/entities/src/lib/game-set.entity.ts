import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { IGameSet } from '@tennis-stats/types'

import { Player } from './player.entity'
import { Tour } from './tour.entity'


@Entity()
export class GameSet extends BaseEntity implements IGameSet {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @ManyToOne(() => Tour, { eager: true })
    tour: Tour
    
    @ManyToOne(() => Player, { eager: true })
    player1: Player
    
    @ManyToOne(() => Player, { eager: true })
    player2: Player
    
    @ManyToOne(() => Player, { eager: true })
    winner: Player
    
    @Column('datetime', { nullable: true })
    time: Date
}