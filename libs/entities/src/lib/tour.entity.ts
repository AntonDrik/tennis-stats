import { ETourStatus, ITour } from '@tennis-stats/types'
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { GameSet } from './game-set.entity'


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
    
    @OneToMany(() => GameSet, gameSet => gameSet.tour, { eager: true })
    gameSets: GameSet[]
    
}