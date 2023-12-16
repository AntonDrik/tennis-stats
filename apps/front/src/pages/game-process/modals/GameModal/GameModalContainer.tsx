import { DialogTitle, Typography } from '@mui/material'
import { IGameSet } from '@tennis-stats/types'
import * as React from 'react'

import FinishGameModal from './components/FinishGameModal/FinishGameModal'
import InProcessGameModal from './components/InProcessGameModal/InProcessGameModal'


interface IProps {
    gameSet: IGameSet
    type: 'finish_game' | 'in_process'
}

function GameModalContainer({ gameSet, type }: IProps) {
    
    const { player1, player2 } = gameSet
    
    return (
        <>
            <DialogTitle align={'center'} sx={{ mb: 2 }}>
                <Typography variant={'subtitle1'}>
                    {gameSet.number} Сет
                </Typography>
                
                <Typography variant={'h5'} fontWeight={600}>
                    {player1.user.shortFullName} - {player2.user.shortFullName}
                </Typography>
            </DialogTitle>
            
            {
                type === 'in_process' &&
                <InProcessGameModal gameSet={gameSet}/>
            }
            
            {
                type === 'finish_game' &&
                <FinishGameModal gameSet={gameSet}/>
            }
        </>
    )
    
}

export default GameModalContainer