import { IMatch, TScore, TScoreCaption } from '@tennis-stats/types'
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
        const scoreArr = (this.gameSets ?? []).reduce((acc, curr) => {
            if (curr.player1?.score > curr.player2?.score) {
                return [acc[0] + 1, acc[1]]
            }
            
            if (curr.player2?.score > curr.player1?.score) {
                return [acc[0], acc[1] + 1]
            }
            
            return acc
        }, [0, 0])
        
        this.matchScore = `${scoreArr[0] as TScore} | ${scoreArr[1] as TScore}`
    }
    
}