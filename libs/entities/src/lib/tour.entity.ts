import { ITour } from '@tennis-stats/types'
import { AfterLoad, BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Match } from './match.entity'


@Entity()
export class Tour extends BaseEntity implements ITour {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @Column('datetime', { nullable: true })
    date: Date
    
    @Column('varchar', { nullable: false })
    setsCount: number
    
    @OneToMany(() => Match, match => match.tour, { eager: true, cascade: true })
    matches: Match[]
    
    isActive: boolean
    
    
    @AfterLoad()
    public loadVariables() {
        if (!this.matches) {
            this.isActive = false
            
            return
        }
        
        const gameSets = this.matches.map((match) => match?.gameSets ?? []).flat()
        const isFinishedAllGameSets = gameSets.every((gameSet) => gameSet.isFinished)
        
        this.isActive = !isFinishedAllGameSets
    }
    
}