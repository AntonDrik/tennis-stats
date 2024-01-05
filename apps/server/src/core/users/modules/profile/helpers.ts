import { GameSet } from '@tennis-stats/entities'


function getWinPercent(userId: number, gameSets: GameSet[]) {
    const winStat = gameSets.reduce((acc, curr) => {
        const activePlayer = curr.player1.user.id === userId ? curr.player1 : curr.player2
        
        if (activePlayer.isWinner) {
            acc.victoryCount += 1
            return acc
        }
        
        acc.defeatCount += 1
        return acc
    }, { victoryCount: 0, defeatCount: 0 })
    
    if (!winStat.victoryCount && !winStat.defeatCount) {
        return 0
    }
    
    const percent = (winStat.victoryCount / (winStat.victoryCount + winStat.defeatCount) * 100)
    
    return Number(percent.toFixed(2))
}

export { getWinPercent }