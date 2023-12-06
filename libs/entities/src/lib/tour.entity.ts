import { ITour } from '@tennis-stats/types'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'


@Entity()
export class Tour extends BaseEntity implements ITour {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @Column('datetime', { nullable: true })
    date: Date
    
    @Column('varchar', { nullable: false })
    setsCount: number
    
}