import { IMatch, IMatchScore } from '@tennis-stats/types'
import {
    AfterLoad,
    BaseEntity,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm'
import { GameSet } from './game-set.entity'
import { Tour } from './tour.entity'
import { User } from './user.entity'


@Entity()
export class Match extends BaseEntity implements IMatch {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @ManyToOne(() => Tour)
    tour: Tour
    
    @ManyToOne(() => User, { eager: true })
    user1: User
    
    @ManyToOne(() => User, { eager: true })
    user2: User
    
    @OneToMany(() => GameSet, gameSet => gameSet.match, { eager: true, cascade: true })
    gameSets: GameSet[]
    
    totalScore: IMatchScore = {
        user1: 0,
        user2: 0
    }
    
    @AfterLoad()
    loadVariables() {
        (this.gameSets ?? []).forEach((item) => {
            if (item.player1?.isWinner) {
                this.totalScore.user1 += 1
            }
            
            if (item.player2?.isWinner) {
                this.totalScore.user2 += 1
            }
        })
    }
    
    public getWinnerLooser() {
        if (this.totalScore.user1 > this.totalScore.user2) {
            return {
                winner: this.user1,
                looser: this.user2
            }
        }
        
        if (this.totalScore.user2 > this.totalScore.user1) {
            return {
                winner: this.user2,
                looser: this.user1
            }
        }
        
        return null
    }
    
}