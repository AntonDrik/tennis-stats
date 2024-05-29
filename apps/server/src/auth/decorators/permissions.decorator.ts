import { SetMetadata } from '@nestjs/common'
import { EPermission } from '@tennis-stats/types'


export const PERMISSIONS_KEY = Symbol('permissions')
export const Permissions = (values: EPermission[]) => SetMetadata(PERMISSIONS_KEY, values)
