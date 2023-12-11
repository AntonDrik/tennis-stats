import { IMatch, TScoreCaption } from '@tennis-stats/types'
import {
    AfterLoad,
    BaseEntity,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm'
import { GameSet } from './game-set.entity'
import { Player } from './player.entity'
import { Tour } from './tour.entity'


@Entity()
export class Match extends BaseEntity implements IMatch {
    
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
    
    @OneToMany(() => GameSet, gameSet => gameSet.match, { eager: true, cascade: true })
    gameSets: GameSet[]
    
    matchScore: TScoreCaption
    
    @AfterLoad()
    loadVariables() {
        this.matchScore = `${this.player1?.score} | ${this.player2?.score}`
    }
    
}