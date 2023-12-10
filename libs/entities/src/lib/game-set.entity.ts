import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne, OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { EGameSetStatus, IGameSet } from '@tennis-stats/types'

import { Player } from './player.entity'
import { Tour } from './tour.entity'


@Entity()
export class GameSet extends BaseEntity implements IGameSet {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @ManyToOne(() => Tour)
    tour: Tour
    
    @OneToOne(() => Player, { eager: true, cascade: true })
    @JoinColumn()
    player1: Player
    
    @OneToOne(() => Player, { eager: true, cascade: true })
    @JoinColumn()
    player2: Player
    
    @Column('datetime', { nullable: true })
    time: Date
    
    @Column('varchar', { default: EGameSetStatus.PENDING })
    status: EGameSetStatus
}