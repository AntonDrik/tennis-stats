import { IUserAuth } from '@tennis-stats/types'
import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity'


@Entity()
export class UserAuth extends BaseEntity implements IUserAuth {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @OneToOne(() => User, (user) => user.auth)
    user?: User
    
    @Column('varchar', { unique: true, nullable: false })
    login: string
    
    @Column('varchar', { nullable: false })
    password: string
    
    @Column('varchar', { default: null })
    refreshToken: string | null
    
}