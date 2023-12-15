import { DialogTitle, Typography } from '@mui/material'
import { EGameSetStatus, IGameSet } from '@tennis-stats/types'
import { useAtom } from 'jotai'
import * as React from 'react'
import { useEffect } from 'react'
import FinishGameModal from './components/FinishGameModal/FinishGameModal'
import InitialModal from './components/InitialModal/InitialModal'
import InProcessGameModal from './components/InProcessGameModal/InProcessGameModal'
import { gameModalAtom } from './GameModalContainer.state'
import { EGameModalType } from './GameModalContainer.types'


interface IProps {
    gameSet: IGameSet
    setIndex: number
}

function GameModalContainer({ gameSet, setIndex }: IProps) {
    
    const [state, setState] = useAtom(gameModalAtom)
    
    const { player1, player2 } = gameSet
    
    useEffect(() => {
        if (gameSet.status === EGameSetStatus.IN_PROCESS) {
            setState(EGameModalType.IN_PROCESS)
            return
        }
        
        setState(EGameModalType.INITIAL)
    }, [])
    
    return (
        <>
            <DialogTitle align={'center'} sx={{ mb: 2 }}>
                <Typography variant={'subtitle1'}>
                    {setIndex} Сет
                </Typography>
                
                <Typography variant={'h5'} fontWeight={600}>
                    {player1.user.shortFullName} - {player2.user.shortFullName}
                </Typography>
            </DialogTitle>
            
            {state === EGameModalType.INITIAL && <InitialModal gameSet={gameSet}/>}
            
            {state === EGameModalType.IN_PROCESS && <InProcessGameModal gameSet={gameSet}/>}
            
            {state === EGameModalType.FINISH_GAME && <FinishGameModal gameSet={gameSet}/>}
        </>
    )
    
}

export default GameModalContainer