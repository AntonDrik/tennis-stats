import { IGameSet, IMatch } from '@tennis-stats/types'
import { atom } from 'jotai'


interface ITourPageState {
    selectedMatch: IMatch | null
    selectedGameSet: IGameSet | null
}

const tourPageState = atom<ITourPageState>({
    selectedMatch: null,
    selectedGameSet: null
})

export { tourPageState }