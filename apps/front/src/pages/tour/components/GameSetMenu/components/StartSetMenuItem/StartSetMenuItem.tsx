import StartIcon from '@mui/icons-material/Start'
import ListItemIcon from '@mui/material/ListItemIcon'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { EGameSetStatus, IGameSet } from '@tennis-stats/types'
import { useStartGameSetMutation } from '../../../../../../core/api'
import { useModal } from '../../../../../../shared/components'
import InProcessGameSetModal from '../../../../modals/InProcessGameSetModal/InProcessGameSetModal'


interface IProps {
    gameSet: IGameSet
    onClick: () => void
}

function StartSetMenuItem({ gameSet, onClick }: IProps) {
    
    const startGameSet = useStartGameSetMutation()
    const modal = useModal()
    
    const isInProcess = gameSet.status === EGameSetStatus.IN_PROCESS
    
    const handleClick = () => {
        onClick()
        
        if (isInProcess) {
            openModal()
            
            return
        }
        
        startGameSet
            .mutateAsync({ id: gameSet.id })
            .then(openModal)
    }
    
    const openModal = (startedGameSet?: IGameSet) => {
        modal.open(
            <InProcessGameSetModal
                gameSetId={startedGameSet?.id ?? gameSet.id}
            />
        )
    }
    
    return (
        <MenuItem onClick={handleClick}>
            <ListItemIcon>
                <StartIcon color={'primary'}/>
            </ListItemIcon>
            
            <Typography>
                {isInProcess ? 'Продолжить сет' : 'Начать сет'}
            </Typography>
        </MenuItem>
    )
    
}

export default StartSetMenuItem