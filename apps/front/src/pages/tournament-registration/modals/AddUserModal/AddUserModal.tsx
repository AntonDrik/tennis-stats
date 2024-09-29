import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import { IUser } from '@tennis-stats/types';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRegisterUserOnTournamentMutation } from '../../../../core/api';
import { useModal } from '../../../../shared/components';
import { UsersAutocomplete } from '../../../../shared/components/Inputs';

function AddUsersToTournamentModal() {
  const modal = useModal();

  const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);

  const tournamentRegistration = useRegisterUserOnTournamentMutation();

  const addUsersToTournament = () => {
    const usersIds = selectedUsers.map((user) => user.id);

    tournamentRegistration.mutateAsync({ usersIds }).then(() => {
      toast.success('Пользователи успешно зарегистрированы в турнире');
      modal.close();
    });
  };

  return (
    <>
      <DialogTitle>Добавить пользователей на турнир</DialogTitle>

      <Box p={3} pt={1}>
        <UsersAutocomplete skipSystemUser onChange={setSelectedUsers} />

        <Box mt={2} onClick={addUsersToTournament}>
          <Button variant={'contained'}>Добавить</Button>
        </Box>
      </Box>
    </>
  );
}

export default AddUsersToTournamentModal;
