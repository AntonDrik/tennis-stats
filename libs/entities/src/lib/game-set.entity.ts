import {
    AfterLoad,
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne, OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { EGameSetStatus, IGameSet } from '@tennis-stats/types'
import { Match } from './match.entity'
import intervalToDuration from 'date-fns/intervalToDuration'

import { Player } from './player.entity'


@Entity()
export class GameSet extends BaseEntity implements IGameSet {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @ManyToOne(() => Match)
    match: Match
    
    @Column('int', { nullable: false })
    number: number
    
    @OneToOne(() => Player, { eager: true, cascade: true })
    @JoinColumn()
    player1: Player
    
    @OneToOne(() => Player, { eager: true, cascade: true })
    @JoinColumn()
    player2: Player
    
    @Column('datetime', { nullable: true })
    startDate: Date
    
    @Column('datetime', { nullable: true })
    endDate: Date
    
    @Column('varchar', { default: EGameSetStatus.PENDING })
    status: EGameSetStatus
    
    duration: string
    
    @AfterLoad()
    loadVariables() {
        if (this.startDate && this.endDate) {
            const duration = intervalToDuration({ start: this.startDate, end: this.endDate })
            // @ts-ignore
            const seconds = duration.seconds < 10 ? `0${duration.seconds}` : duration.seconds
            
            this.duration = `${duration.minutes}:${seconds}`
        }
    }
    
}