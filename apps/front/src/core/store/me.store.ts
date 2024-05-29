import { IUser } from '@tennis-stats/types'
import { atom, createStore } from 'jotai'


const meStore = createStore()
const meAtom = atom<IUser | null>(null)

meStore.set(meAtom, null)


function updateMeStore(user: IUser | null) {
    if (!user) {
        meStore.set(meAtom, null)
        return
    }
    
    meStore.set(meAtom, user)
}

export {
    meStore,
    meAtom,
    updateMeStore
}