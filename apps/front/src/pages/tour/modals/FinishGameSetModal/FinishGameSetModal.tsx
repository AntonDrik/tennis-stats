import DialogContent from '@mui/material/DialogContent'
import * as React from 'react'
import { useModal } from '../../../../shared/components'

import FinishButton from '../common/FinishButton/FinishButton'
import ModalHeader from '../common/Header/Header'
import ScoreBlock from '../common/ScoreBlock/ScoreBlock'


function FinishGameSetModal() {
    
    const modal = useModal()
    
    return (
        <>
            <ModalHeader/>
            
            <DialogContent>
                <ScoreBlock/>
                
                <FinishButton onSuccess={() => modal.close()}/>
            </DialogContent>
        </>
    )
    
}

export default FinishGameSetModal