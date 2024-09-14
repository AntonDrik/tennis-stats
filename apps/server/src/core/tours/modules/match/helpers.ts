import { uniqueCombinations } from '@tennis-stats/helpers'


function getAvailableScoresBySetsCount(setsCount: number | string): number[][] {
    const gameSetsCount = Number(setsCount)
    const tempArr = Array.from({ length: gameSetsCount + 1 }, (_, i) => i)
    
    return uniqueCombinations(tempArr)
        .reduce((acc, curr) => {
            if (curr[0] + curr[1] === gameSetsCount) {
                acc.push(curr)
            }
            
            return acc
        }, [] as number[][])
}

export {
    getAvailableScoresBySetsCount
}