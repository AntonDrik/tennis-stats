import { Button, DialogContent, Divider } from '@mui/material'
import { IGameSet } from '@tennis-stats/types'
import { useSetAtom } from 'jotai'
import * as React from 'react'
import { useStartGameSetMutation } from '../../../../../../core/api'
import { Spinner } from '../../../../../../shared/components'
import { gameModalAtom } from '../../GameModalContainer.state'
import { EGameModalType } from '../../GameModalContainer.types'


interface IProps {
    gameSetId: number
}

function InitialModal({ gameSetId }: IProps) {
    
    const changeGameModal = useSetAtom(gameModalAtom)
    
    const { mutateAsync, isLoading } = useStartGameSetMutation()
    
    const handleStartGame = () => {
        mutateAsync({ id: gameSetId }).then(() => {
            changeGameModal(EGameModalType.IN_PROCESS)
        })
    }
    
    const handleCloseGame = () => {
        changeGameModal(EGameModalType.CLOSE_GAME)
    }
    
    return (
        <DialogContent>
            {isLoading && <Spinner/>}
            
            <Button
                color={'primary'}
                fullWidth
                variant={'contained'}
                onClick={handleStartGame}
            >Начать игру</Button>
            
            <Divider sx={{ my: 1 }}>Или</Divider>
            
            <Button
                color={'secondary'}
                fullWidth
                variant={'contained'}
                onClick={handleCloseGame}
            >Завершить игру</Button>
        </DialogContent>
    )
    
}

export default InitialModal