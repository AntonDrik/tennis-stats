import { secondsWithTwoDigits } from '@tennis-stats/helpers'
import { EGameSetStatus, IGameSet, TScoreCaption } from '@tennis-stats/types'
import intervalToDuration from 'date-fns/intervalToDuration'
import {
    AfterLoad,
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Match } from './match.entity'

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
    
    @Column('boolean', { default: false })
    isLastInMatch: boolean
    
    duration: string
    isFinished: boolean
    scoreCaption: TScoreCaption
    
    @AfterLoad()
    loadVariables() {
        if (this.startDate && this.endDate) {
            const duration = intervalToDuration({ start: this.startDate, end: this.endDate })
            const seconds = secondsWithTwoDigits(duration.seconds)
            
            this.duration = `${duration.minutes}:${seconds}`
        }
        
        this.isFinished = [EGameSetStatus.FINISHED, EGameSetStatus.CANCELED].includes(this.status)
        
        this.scoreCaption = `${this.player1?.score} | ${this.player2?.score}`
    }
    
}