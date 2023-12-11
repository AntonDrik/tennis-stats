import Button from '@mui/material/Button'
import DialogContent from '@mui/material/DialogContent'
import { useMemo, useState } from 'react'
import ScoreBlock from '../ScoreBlock/ScoreBlock'


function CloseGameModal() {
    
    const [score, setScore] = useState<[number, number]>([0, 0])
    
    const isValidScore = useMemo(() => {
        if (score[0] < 11 && score[1] < 11) {
            return false
        }
        
        return score[0] !== score[1];
    }, [score])
    
    return (
        <DialogContent>
            <ScoreBlock onChange={setScore}/>
            
            <Button
                variant={'contained'}
                fullWidth
                sx={{ mt: 2 }}
                disabled={!isValidScore}
            >Завершить игру</Button>
        
        
        </DialogContent>
    )
    
}

export default CloseGameModal