import { clientTimezone, endOfDayInUTC, startOfDayInUTC } from '@tennis-stats/helpers'
import { atom } from 'jotai'


interface IDateRange {
    startDate: string,
    endDate: string
}

interface IDateState {
    date: Date,
    isShowAll: boolean
}

const dateStateAtom = atom<IDateState>({
    date: new Date(),
    isShowAll: false
})

const dateRangeAtom = atom<IDateRange | null>(
    (get) => {
        const { date, isShowAll } = get(dateStateAtom)
        
        if (isShowAll) {
            return null
        }
        
        return {
            startDate: startOfDayInUTC(date, clientTimezone).toISOString(),
            endDate: endOfDayInUTC(date, clientTimezone).toISOString()
        }
    }
)


const updateDateStateAtom = atom(
    () => null,
    (get, set, value: Partial<IDateState>) => {
        set(dateStateAtom, {
            ...get(dateStateAtom),
            ...value
        })
    }
)

export {
    dateStateAtom,
    dateRangeAtom,
    updateDateStateAtom,
}