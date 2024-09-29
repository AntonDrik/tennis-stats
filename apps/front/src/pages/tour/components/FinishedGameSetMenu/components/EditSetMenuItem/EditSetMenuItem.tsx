import EditIcon from '@mui/icons-material/Edit';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useModal } from '../../../../../../shared/components';
import EditGameSetModal from '../../../../../../shared/components/GameSet/modals/EditGameSetModal/EditGameSetModal';

interface IProps {
  onClick: () => void;
}

function EditSetMenuItem({ onClick }: IProps) {
  const modal = useModal();

  const handleClick = () => {
    onClick();

    modal.open(<EditGameSetModal />);
  };

  return (
    <MenuItem onClick={handleClick}>
      <ListItemIcon>
        <EditIcon color={'warning'} />
      </ListItemIcon>

      <Typography>Редактировать счет</Typography>
    </MenuItem>
  );
}

export default EditSetMenuItem;
