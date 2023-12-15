import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import { EGameSetStatus, IGameSet } from '@tennis-stats/types'
import { useEffect, useState } from 'react'
import { useFinishGameSetMutation } from '../../../../../../core/api'
import { useTimer } from '../../../../../../shared/hooks'
import FinishButton from '../common/FinishButton/FinishButton'
import ScoreBlock from '../common/ScoreBlock/ScoreBlock'

interface IProps {
    gameSet: IGameSet
}

function InProcessGameModal({gameSet}: IProps) {
    
    const finishGameSet = useFinishGameSetMutation()
    
    const timer = useTimer()
    
    const [score, setScore] = useState<[number, number]>([0, 0])
    
    const handleFinishGame = () => {
        if (!gameSet) {
            return
        }
        
        finishGameSet.mutateAsync({ id: gameSet.id, status: EGameSetStatus.FINISHED })
            .then(() => {
                timer.stop()
            })
    }
    
    useEffect(() => {
        if (!gameSet.startDate) {
            return
        }
        
        timer.start(String(gameSet.startDate))
    }, [gameSet])
    
    return (
        <DialogContent>
            {
                gameSet.startDate &&
                <Typography
                    align={'center'}
                    variant={'subtitle1'}
                    sx={{ opacity: 0.5, mb: 2 }}
                >Время партии: {timer.time}</Typography>
            }
            
            <ScoreBlock onChange={setScore}/>
            
            <FinishButton
                score={score}
                onClick={handleFinishGame}
            />
        
        </DialogContent>
    )
    
}

export default InProcessGameModal