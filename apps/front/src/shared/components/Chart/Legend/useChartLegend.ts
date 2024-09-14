import { arrayToObject } from '@tennis-stats/helpers'
import {useEffect, useState} from "react";

export interface ChartLegendHook {
    state: Record<string, boolean>
    arrayState: [string, boolean][],
    toggle: (category: string) => void
    isDisabled: (category: string) => boolean
}

function useChartLegend(categoriesList: string[] | undefined): ChartLegendHook {

    const [state, setState] = useState<Record<string, boolean>>({})

    const categories = Object.entries(state)

    const toggle = (category: string) => {
        setState((prev) => ({
            ...prev,
            [category]: !prev[category]
        }))
    }
    
    const isDisabled = (category: string) => {
        return state[category]
    }

    useEffect(() => {
        setState(arrayToObject(categoriesList, (v) => v, false))
    }, [categoriesList])

    return {
        state,
        arrayState: categories,
        toggle,
        isDisabled
    }

}

export default useChartLegend