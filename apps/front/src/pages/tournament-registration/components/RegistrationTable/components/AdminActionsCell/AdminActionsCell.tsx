import { Flex, IconButton } from '@radix-ui/themes';
import { IUser } from '@tennis-stats/types';
import { toast } from 'react-hot-toast';
import { useLeaveTournamentMutation } from '../../../../../../core/api';
import { useConfirmModal } from '../../../../../../shared/components/Modals';
import { TrashIcon } from '../../../../../../shared/svg-icons';

interface IProps {
  user: IUser;
}

function AdminActionsCell(props: IProps) {
  const leaveTournament = useLeaveTournamentMutation();

  const confirm = useConfirmModal({
    title: `${props.user.nickname}`,
    description: 'Вы действительно хотите убрать пользователя из турнира?',
    confirmTitle: 'Отменить регистрацию',
    denyTitle: 'Назад',
  });

  const handleClick = () => {
    confirm(() => {
      leaveTournament.mutateAsync({ id: props.user.id }).then(() => {
        toast.success('Вы успешно удалили пользователя из турнира');
      });
    });
  };

  return (
    <Flex gap={'4'} justify={'center'}>
      <IconButton variant={'soft'} color={'red'} size={'2'} onClick={handleClick}>
        <TrashIcon />
      </IconButton>
    </Flex>
  );
}

export default AdminActionsCell;
