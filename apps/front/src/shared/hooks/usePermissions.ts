import { EPermission } from '@tennis-stats/types'
import { useStore } from 'jotai'
import { meAtom } from '../../core/store'


interface IPermissions {
    canCreateUser: boolean
    canCrudTour: boolean
    canCrudGameSet: boolean
}

function usePermissions(): IPermissions {
    
    const store = useStore()
    const user = store.get(meAtom)
    
    const permissions = new Set(user?.permissions.map(({ value }) => value) ?? [])

    return {
        canCreateUser: permissions.has(EPermission.CREATE_USER),
        canCrudTour: permissions.has(EPermission.TOUR_CRUD),
        canCrudGameSet: permissions.has(EPermission.GAME_SET_CRUD)
    }
}

export default usePermissions