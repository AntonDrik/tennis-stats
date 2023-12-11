import {
    AfterLoad,
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne, OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { EGameSetStatus, IGameSet, TScoreCaption } from '@tennis-stats/types'
import { Match } from './match.entity'
import intervalToDuration from 'date-fns/intervalToDuration'

import { Player } from './player.entity'


@Entity()
export class GameSet extends BaseEntity implements IGameSet {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @ManyToOne(() => Match)
    match: Match
    
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
    
    setScore: TScoreCaption
    duration: string
    
    @AfterLoad()
    loadVariables() {
        this.setScore = `${this.player1?.score} | ${this.player2?.score}`
        
        if (this.startDate && this.endDate) {
            const duration = intervalToDuration({ start: this.startDate, end: this.endDate })
            // @ts-ignore
            const seconds = duration.seconds < 10 ? `0${duration.seconds}` : duration.seconds
            
            this.duration = `${duration.minutes}:${seconds}`
        }
        
    }
    
}