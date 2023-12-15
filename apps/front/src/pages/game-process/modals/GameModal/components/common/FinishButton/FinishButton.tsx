import Button from '@mui/material/Button'
import { useMemo } from 'react'


interface IProps {
    score: [number, number]
    onClick: () => void
}

function FinishButton({ score, onClick }: IProps) {
    
    const isValidScore = useMemo(() => {
        if (score[0] < 11 && score[1] < 11) {
            return false
        }
        
        return score[0] !== score[1]
    }, [score])
    
    return (
        
        <Button
            variant={'contained'}
            fullWidth
            sx={{ mt: 2 }}
            disabled={!isValidScore}
            onClick={onClick}
        >Завершить игру</Button>
    
    )
    
}

export default FinishButton