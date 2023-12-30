import DialogContent from '@mui/material/DialogContent'
import * as React from 'react'
import { useIsMutating } from 'react-query'
import { Spinner, useModal } from '../../../../shared/components'

import FinishButton from '../common/FinishButton/FinishButton'
import ModalHeader from '../common/Header/Header'
import ScoreBlock from '../common/ScoreBlock/ScoreBlock'


function FinishGameSetModal() {
    
    const isMutating = useIsMutating(['finish-game-set'])
    
    const modal = useModal()
    
    return (
        <>
            {isMutating > 0 && <Spinner/>}
            
            <ModalHeader/>
            
            <DialogContent>
                <ScoreBlock/>
                
                <FinishButton onSuccess={() => modal.close()}/>
            </DialogContent>
        </>
    )
    
}

export default FinishGameSetModal