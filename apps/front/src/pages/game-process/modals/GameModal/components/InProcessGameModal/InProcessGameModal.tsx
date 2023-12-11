import Button from '@mui/material/Button'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import { useEffect, useMemo, useState } from 'react'
import { useGetActiveGameSetQuery } from '../../../../../../core/api'
import { Spinner } from '../../../../../../shared/components'
import { useTimer } from '../../../../../../shared/hooks'
import ScoreBlock from '../ScoreBlock/ScoreBlock'


function InProcessGameModal() {
    
    const { data, isLoading } = useGetActiveGameSetQuery()
    
    const timer = useTimer()
    
    const [score, setScore] = useState<[number, number]>([0, 0])
    
    const isValidScore = useMemo(() => {
        if (score[0] < 11 && score[1] < 11) {
            return false
        }
        
        return score[0] !== score[1]
    }, [score])
    
    const handleCloseGame = () => {
        timer.stop()
    }
    
    useEffect(() => {
        if (!data?.startDate) {
            return
        }
        
        timer.start(String(data.startDate))
    }, [data])
    
    return (
        <DialogContent>
            {isLoading && <Spinner/>}
            
            {
                data?.startDate &&
                <Typography
                    align={'center'}
                    variant={'subtitle1'}
                    sx={{ opacity: 0.5, mb: 2 }}
                >Время партии: {timer.time}</Typography>
            }
            
            <ScoreBlock onChange={setScore}/>
            
            <Button
                variant={'contained'}
                fullWidth
                sx={{ mt: 2 }}
                disabled={!isValidScore}
                onClick={handleCloseGame}
            >Завершить игру</Button>
            
        </DialogContent>
    )
    
}

export default InProcessGameModal