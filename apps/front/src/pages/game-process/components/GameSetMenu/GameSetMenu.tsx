import { MouseEvent, useState } from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { EGameSetStatus, IGameSet, ITour } from '@tennis-stats/types'

import CancelSetMenuItem from './components/CancelSetMenuItem/CancelSetMenuItem'
import FinishSetMenuItem from './components/FinishSetMenuItem/FinishSetMenuItem'
import StartSetMenuItem from './components/StartSetMenuItem/StartSetMenuItem'


interface IProps {
    tour: ITour
    gameSet: IGameSet
}

function GameSetMenu({ tour, gameSet }: IProps) {
    
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const isOpen = Boolean(anchorEl)
    
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    
    const handleClose = () => {
        setAnchorEl(null)
    }
    
    return (
        <Box>
            <IconButton onClick={handleClick}>
                <MoreVertIcon/>
            </IconButton>
            
            <Menu
                anchorEl={anchorEl}
                open={isOpen}
                elevation={10}
                onClose={handleClose}
            >
                <StartSetMenuItem
                    gameSet={gameSet}
                    onClick={handleClose}
                />
                
                {
                    gameSet.status !== EGameSetStatus.IN_PROCESS &&
                    <FinishSetMenuItem
                        gameSet={gameSet}
                        onClick={handleClose}
                    />
                }
                
                <CancelSetMenuItem
                    tourId={tour.id}
                    gameSetId={gameSet.id}
                    onClick={handleClose}
                />
            </Menu>
        </Box>
    
    )
    
}

export default GameSetMenu