import DialogContent from '@mui/material/DialogContent'
import { EGameSetStatus, IGameSet } from '@tennis-stats/types'
import { useState } from 'react'
import { useFinishGameSetMutation } from '../../../../../../core/api'
import { useModal } from '../../../../../../shared/components'
import FinishButton from '../common/FinishButton/FinishButton'
import ScoreBlock from '../common/ScoreBlock/ScoreBlock'


interface IProps {
    gameSet: IGameSet
}

function FinishGameModal({ gameSet }: IProps) {
    
    const finishGameSet = useFinishGameSetMutation()
    
    const modal = useModal()
    
    const [score, setScore] = useState<[number, number]>([0, 0])
    
    const handleFinishClick = () => {
        void finishGameSet.mutateAsync({
            id: gameSet.id,
            status: EGameSetStatus.FINISHED
        }).then(() => {
            modal.close()
        })
    }
    
    return (
        <DialogContent>
            <ScoreBlock onChange={setScore}/>
            
            <FinishButton
                score={score}
                onClick={handleFinishClick}
            />
        </DialogContent>
    )
    
}

export default FinishGameModal