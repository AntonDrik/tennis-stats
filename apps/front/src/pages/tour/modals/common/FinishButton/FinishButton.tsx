import Button from '@mui/material/Button'
import { EGameSetStatus } from '@tennis-stats/types'
import { useAtomValue } from 'jotai'
import { useFinishGameSetMutation } from '../../../../../core/api'
import { tourPageState } from '../../../TourPage.state'
import { isValidScoreAtom, scoreBlockAtom } from '../ScoreBlock/ScoreBlock.state'


interface IProps {
    onSuccess: () => void
}

function FinishButton({ onSuccess }: IProps) {
    
    const score = useAtomValue(scoreBlockAtom)
    const isValidScore = useAtomValue(isValidScoreAtom)
    const { selectedGameSet, selectedMatch } = useAtomValue(tourPageState)
    
    const finishGameSet = useFinishGameSetMutation(selectedMatch?.id, selectedGameSet?.id)
    
    const handleFinishClick = () => {
        finishGameSet.mutateAsync({
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