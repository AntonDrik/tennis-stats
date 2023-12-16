import DialogContent from '@mui/material/DialogContent'
import { IGameSet, TScore } from '@tennis-stats/types'
import { useState } from 'react'
import { useModal } from '../../../../../../shared/components'
import FinishButton from '../common/FinishButton/FinishButton'
import ScoreBlock from '../common/ScoreBlock/ScoreBlock'


interface IProps {
    gameSet: IGameSet
}

function FinishGameModal({ gameSet }: IProps) {
    
    const modal = useModal()
    
    const [score, setScore] = useState<[TScore, TScore]>([0, 0])
    
    return (
        <DialogContent>
            <ScoreBlock onChange={setScore}/>
            
            <FinishButton
                score={score}
                gameSetId={gameSet.id}
                onSuccess={() => modal.close()}
            />
        </DialogContent>
    )
    
}

export default FinishGameModal