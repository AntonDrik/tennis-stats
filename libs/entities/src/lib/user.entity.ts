import { IUser } from '@tennis-stats/types'
import { AfterLoad, BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'


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
    
    @Column('int', { default: 100 })
    rating: number
    
    fullName: string
    shortFullName: string
    
    @AfterLoad()
    getFullName(): void {
        this.fullName = `${this.firstName} ${this.lastName}`
        this.shortFullName = `${this.lastName} ${this.firstName.substring(0, 1)}.`
    }
}