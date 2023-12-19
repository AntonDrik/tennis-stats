import DialogContent from '@mui/material/DialogContent'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import * as React from 'react'
import { useGetGameSetQuery } from '../../../../core/api'
import { useModal } from '../../../../shared/components'
import FinishButton from '../common/FinishButton/FinishButton'
import ModalHeader from '../common/Header/Header'
import ScoreBlock from '../common/ScoreBlock/ScoreBlock'
import { scoreBlockAtom } from '../common/ScoreBlock/ScoreBlock.state'


interface IProps {
    gameSetId: number
}

function FinishGameSetModal({ gameSetId }: IProps) {
    
    const { data: gameSet } = useGetGameSetQuery(gameSetId)
    
    const setScore = useSetAtom(scoreBlockAtom)
    const modal = useModal()
    
    useEffect(() => {
        if (!gameSet) {
            return
        }
        
        setScore([gameSet.player1.score, gameSet.player2.score])
    }, [gameSet])
    
    return (
        <>
            {
                gameSet &&
                <ModalHeader gameSet={gameSet}/>
            }
            
            <DialogContent>
                <ScoreBlock onChange={setScore}/>
                
                <FinishButton
                    gameSetId={gameSetId}
                    onSuccess={() => modal.close()}
                />
            </DialogContent>
        </>
    )
    
}

export default FinishGameSetModal