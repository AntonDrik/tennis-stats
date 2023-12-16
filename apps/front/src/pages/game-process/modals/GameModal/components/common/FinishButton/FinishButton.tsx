import Button from '@mui/material/Button'
import { EGameSetStatus, TScore } from '@tennis-stats/types'
import { useMemo } from 'react'
import { useFinishGameSetMutation } from '../../../../../../../core/api'


interface IProps {
    score: [TScore, TScore]
    gameSetId: number
    onSuccess: () => void
}

function FinishButton({ score, gameSetId, onSuccess }: IProps) {
    
    const finishGameSet = useFinishGameSetMutation()
    
    const isValidScore = useMemo(() => {
        if (score[0] < 11 && score[1] < 11) {
            return false
        }
        
        return score[0] !== score[1]
    }, [score])
    
    const handleFinishClick = () => {
        finishGameSet.mutateAsync({
            id: gameSetId,
            player1Score: score[0],
            player2Score: score[1],
            status: EGameSetStatus.FINISHED
        }).then(onSuccess)
    }
    
    return (
        <Button
            variant={'contained'}
            fullWidth
            sx={{ mt: 2 }}
            disabled={!isValidScore}
            onClick={handleFinishClick}
        >Завершить игру</Button>
    )
    
}

export default FinishButton