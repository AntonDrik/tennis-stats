import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ListItemIcon from '@mui/material/ListItemIcon'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { useModal } from '../../../../../../shared/components'
import FinishGameSetModal from '../../../../modals/FinishGameSetModal/FinishGameSetModal'


interface IProps {
    onClick: () => void
}

function FinishSetMenuItem({ onClick }: IProps) {
    
    const modal = useModal()
    
    const handleClick = () => {
        onClick()
        
        modal.open(<FinishGameSetModal/>)
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