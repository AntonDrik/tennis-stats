import { EPermission, IPermission } from '@tennis-stats/types'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'


@Entity()
export class Permission extends BaseEntity implements IPermission {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @Column('varchar', { unique: true })
    value: EPermission
    
}