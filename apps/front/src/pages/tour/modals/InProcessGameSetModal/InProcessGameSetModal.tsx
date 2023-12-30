import DialogContent from '@mui/material/DialogContent'
import { TScore } from '@tennis-stats/types'
import { useAtomValue } from 'jotai'
import ms from 'ms'
import * as React from 'react'
import { useIsMutating } from 'react-query'
import { useUpdateGameSetScoreMutation } from '../../../../core/api'
import { Spinner, useModal } from '../../../../shared/components'
import { tourPageState } from '../../TourPage.state'
import FinishButton from '../common/FinishButton/FinishButton'
import ModalHeader from '../common/Header/Header'
import ScoreBlock from '../common/ScoreBlock/ScoreBlock'


function InProcessGameSetModal() {
    
    const { selectedMatch, selectedGameSet } = useAtomValue(tourPageState)
    const updateScore = useUpdateGameSetScoreMutation(selectedMatch?.id, selectedGameSet?.id)
    
    const isMutating = useIsMutating(['finish-game-set'])
    
    const modal = useModal()
    
    const handleScoreChange = (score: [TScore, TScore]) => {
        updateScore.mutate({
            player1Score: score[0],
            player2Score: score[1]
        })
    }
    
    return (
        <>
            {isMutating > 0 && <Spinner/>}
            
            <ModalHeader/>
            
            <DialogContent>
                <ScoreBlock
                    refetchIntervalMs={ms('5s')}
                    onChange={handleScoreChange}
                />
                
                <FinishButton onSuccess={() => modal.close()}/>
            </DialogContent>
        </>
    )
}

export default InProcessGameSetModal