import { IGameSet, IMatch } from '@tennis-stats/types'
import { atom } from 'jotai'


interface ITourPageState {
    selectedMatch: IMatch | null
    selectedGameSet: IGameSet | null
}

const tourPageStateAtom = atom<ITourPageState>({
    selectedMatch: null,
    selectedGameSet: null
})

export { tourPageStateAtom, ITourPageState }
