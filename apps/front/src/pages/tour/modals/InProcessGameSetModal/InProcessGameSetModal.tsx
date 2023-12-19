import DialogContent from '@mui/material/DialogContent'
import { TScore } from '@tennis-stats/types'
import { useSetAtom } from 'jotai'
import ms from 'ms'
import { useEffect } from 'react'
import * as React from 'react'
import { useGetGameSetQuery, useUpdateGameSetScoreMutation } from '../../../../core/api'
import { useModal } from '../../../../shared/components'
import FinishButton from '../common/FinishButton/FinishButton'
import ModalHeader from '../common/Header/Header'
import ScoreBlock from '../common/ScoreBlock/ScoreBlock'
import { scoreBlockAtom } from '../common/ScoreBlock/ScoreBlock.state'


interface IProps {
    gameSetId: number
}

function InProcessGameSetModal({ gameSetId }: IProps) {
    
    const updateScore = useUpdateGameSetScoreMutation()
    const { data: gameSet } = useGetGameSetQuery(gameSetId, {
        refetchOnMount: true,
        refetchInterval: ms('5s')
    })
    
    const modal = useModal()
    const setScore = useSetAtom(scoreBlockAtom)
    
    const handleScoreChange = (score: [TScore, TScore]) => {
        updateScore.mutate({
            id: gameSetId,
            player1Score: score[0],
            player2Score: score[1]
        })
    }
    
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
                <ScoreBlock onChange={handleScoreChange}/>
                
                <FinishButton
                    gameSetId={gameSetId}
                    onSuccess={() => {
                        modal.close()
                    }}
                />
            </DialogContent>
        </>
    )
}

export default InProcessGameSetModal