import { EGameSetStatus, ETourStatus, ITour } from '@tennis-stats/types'
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Match } from './match.entity'


@Entity()
export class Tour extends BaseEntity implements ITour {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @Column('datetime', { nullable: true })
    date: Date
    
    @Column('varchar', { nullable: false })
    setsCount: number
    
    @Column('varchar', { nullable: false })
    status: ETourStatus
    
    @OneToMany(() => Match, match => match.tour, { eager: true, cascade: true })
    matches: Match[]
    
    public isCanFinish(): boolean {
        if (!this.matches) {
            return false
        }
        
        const finishStatuses = [EGameSetStatus.CANCELED, EGameSetStatus.FINISHED]
        
        const gameSets = this.matches.map((match) => match.gameSets).flat()
        
        return gameSets.every(({ status }) => {
            return finishStatuses.includes(status)
        })
    }
    
}