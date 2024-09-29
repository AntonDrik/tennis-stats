import { Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IUser } from '@tennis-stats/types';
import { toast } from 'react-hot-toast';
import { useUnregisterUserFromTournamentMutation } from '../../../../../../core/api';
import { useConfirmModal } from '../../../../../../shared/components/Modals';

interface IProps {
  user: IUser;
}

function AdminActionsCell(props: IProps) {
  const unregisterFromTournament = useUnregisterUserFromTournamentMutation();

  const confirm = useConfirmModal({
    title: 'Вы действительно хотите удалить пользователя из турнира?',
    confirmTitle: 'Удалить',
    denyTitle: 'Назад',
  });

  const handleClick = () => {
    confirm(() => {
      unregisterFromTournament.mutateAsync({ id: props.user.id }).then(() => {
        toast.success('Вы успешно удалили пользователя из турнира');
      });
    });
  };

  return (
    <Stack direction={'row'} gap={6} justifyContent={'center'}>
      <IconButton onClick={handleClick}>
        <DeleteForeverIcon color={'error'} />
      </IconButton>
    </Stack>
  );
}

export default AdminActionsCell;
