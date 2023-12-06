import { IUser } from '@tennis-stats/types'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'


@Entity()
export class User extends BaseEntity implements IUser {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @Column('varchar', { nullable: false })
    firstName: string
    
    @Column('varchar', { nullable: false })
    lastName: string
    
    @Column('varchar', { nullable: false })
    age: number
}