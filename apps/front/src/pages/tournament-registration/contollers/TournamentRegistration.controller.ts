import { ITournament } from '@tennis-stats/types';
import { useAtomValue } from 'jotai/index';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { useJoinTournamentMutation, useLeaveTournamentMutation } from '../../../core/api';
import { meAtom } from '../../../core/store';
import { useConfirmModal } from '../../../shared/components';

function useTournamentRegistrationController(tournament: ITournament | undefined) {
  const me = useAtomValue(meAtom);

  const joinTournamentMutation = useJoinTournamentMutation(tournament?.id);
  const leaveTournamentMutation = useLeaveTournamentMutation(tournament?.id);

  const confirmUnregister = useConfirmModal({
    title: 'Отмена регистрации',
    description: 'Вы действительно хотите отменить регистрацию на турнир?',
    confirmTitle: 'Отменить регистрацию',
    denyTitle: 'Назад',
  });

  const joinedList = useMemo(
    () => tournament?.registeredUsers ?? [],
    [tournament?.registeredUsers]
  );

  const isMeRegistered = useMemo(() => {
    return Boolean(joinedList.find((user) => user.id === me?.id));
  }, [joinedList, me?.id]);

  const joinTournament = useCallback(() => {
    joinTournamentMutation.mutateAsync({ usersIds: [me?.id ?? -1] }).then(() => {
      toast.success('Вы успешно присоединились к турниру');
    });
  }, [me?.id, tournament?.id]);

  const leaveTournament = useCallback(() => {
    confirmUnregister(() => {
      leaveTournamentMutation.mutateAsync({ id: me?.id ?? -1 }).then(() => {
        toast.success('Вы успешно покинули турнир');
      });
    });
  }, [me?.id, tournament?.id]);

  const toggleTournament = useCallback(() => {
    isMeRegistered ? leaveTournament() : joinTournament();
  }, [isMeRegistered, me?.id, tournament?.id]);

  return {
    joinTournament,
    leaveTournament,
    joinedList,
    isMeRegistered,
    toggleTournament,
  };
}

export default useTournamentRegistrationController;
