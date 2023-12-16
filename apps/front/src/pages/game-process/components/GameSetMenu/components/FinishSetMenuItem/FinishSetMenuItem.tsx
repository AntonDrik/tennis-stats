import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ListItemIcon from '@mui/material/ListItemIcon'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { IGameSet } from '@tennis-stats/types'
import { useModal } from '../../../../../../shared/components'
import GameModalContainer from '../../../../modals/GameModal/GameModalContainer'


interface IProps {
    gameSet: IGameSet
    onClick: () => void
}

function FinishSetMenuItem({ gameSet, onClick }: IProps) {
    
    const modal = useModal()
    
    const handleClick = () => {
        onClick()
        
        modal.open(
            <GameModalContainer gameSet={gameSet} type={'finish_game'}/>,
            { maxWidth: 'xl', fullWidth: true }
        )
    }
    
    return (
        <MenuItem onClick={handleClick}>
            <ListItemIcon>
                <CheckCircleIcon color={'success'}/>
            </ListItemIcon>
            
            <Typography>Завершить сет</Typography>
        </MenuItem>
    )
    
}


export default FinishSetMenuItem