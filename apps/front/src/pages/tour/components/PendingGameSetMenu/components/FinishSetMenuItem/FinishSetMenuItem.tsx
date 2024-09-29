import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useModal } from '../../../../../../shared/components';
import FinishGameSetModal from '../../../../../../shared/components/GameSet/modals/FinishGameSetModal/FinishGameSetModal';

interface IProps {
  onClick: () => void;
}

function FinishSetMenuItem(props: IProps) {
  const modal = useModal();

  const handleClick = () => {
    props.onClick();

    modal.open(<FinishGameSetModal />, { maxWidth: 'sm' });
  };

  return (
    <MenuItem onClick={handleClick}>
      <ListItemIcon>
        <CheckCircleIcon color={'success'} />
      </ListItemIcon>

      <Typography>Завершить сет</Typography>
    </MenuItem>
  );
}

export default FinishSetMenuItem;
