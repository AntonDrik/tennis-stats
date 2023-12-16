import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import { IGameSet, TScore } from '@tennis-stats/types'
import { useEffect, useState } from 'react'
import { useTimer } from '../../../../../../shared/hooks'
import FinishButton from '../common/FinishButton/FinishButton'
import ScoreBlock from '../common/ScoreBlock/ScoreBlock'


interface IProps {
    gameSet: IGameSet
}

function InProcessGameModal({ gameSet }: IProps) {
    
    const timer = useTimer()
    
    const [score, setScore] = useState<[TScore, TScore]>([0, 0])
    
    
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
                gameSetId={gameSet.id}
                onSuccess={() => timer.stop()}
            />
        </DialogContent>
    )
    
}

export default InProcessGameModal