import { useSetAtom } from 'jotai'
import { MouseEvent, useState } from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { EGameSetStatus, IGameSet, IMatch } from '@tennis-stats/types'

import CancelSetMenuItem from './components/CancelSetMenuItem/CancelSetMenuItem'
import FinishSetMenuItem from './components/FinishSetMenuItem/FinishSetMenuItem'
import StartSetMenuItem from './components/StartSetMenuItem/StartSetMenuItem'
import { tourPageState } from '../../TourPage.state'


interface IProps {
    match: IMatch
    gameSet: IGameSet
}

function GameSetMenu({ match, gameSet }: IProps) {
    
    const setTourPageState = useSetAtom(tourPageState)
    
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const isOpen = Boolean(anchorEl)
    
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setTourPageState({
            selectedMatch: match,
            selectedGameSet: gameSet
        })
        
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
                <StartSetMenuItem onClick={handleClose}/>
                
                {
                    gameSet.status !== EGameSetStatus.IN_PROCESS &&
                    <FinishSetMenuItem onClick={handleClose}/>
                }
                
                <CancelSetMenuItem onClick={handleClose}/>
            </Menu>
        </Box>
    
    )
    
}

export default GameSetMenu