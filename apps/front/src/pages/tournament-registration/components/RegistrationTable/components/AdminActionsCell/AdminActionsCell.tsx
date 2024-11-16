import { Flex, IconButton } from '@radix-ui/themes';
import { IUser } from '@tennis-stats/types';
import { useConfirmModal } from '../../../../../../shared/components/Modals';
import { TrashIcon } from '../../../../../../shared/svg-icons';

interface IProps {
  user: IUser;
  onLeaveTournament: (user: IUser) => void;
}

function AdminActionsCell(props: IProps) {
  const confirm = useConfirmModal({
    title: `${props.user.nickname}`,
    description: 'Вы действительно хотите убрать пользователя из турнира?',
    confirmTitle: 'Отменить регистрацию',
    denyTitle: 'Назад',
  });

  const handleClick = () => {
    confirm(() => props.onLeaveTournament(props.user));
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
