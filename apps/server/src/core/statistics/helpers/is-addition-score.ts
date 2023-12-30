import { GameSet } from '@tennis-stats/entities'


function isAdditionScore(gameSet: GameSet) {
    return (gameSet.player1.score + gameSet.player2.score) > 20
}

export default isAdditionScore