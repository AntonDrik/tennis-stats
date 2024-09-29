import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { useModal } from '../../../../shared/components';
import RegistrationForm from '../../../../shared/components/Auth/RegistrationForm/RegistrationForm';

function CreateUserModal() {
  const modal = useModal();

  const handleSuccessCreate = () => modal.close();

  return (
    <>
      <DialogTitle align={'center'}>Создание пользователя</DialogTitle>

      <DialogContent>
        <RegistrationForm
          reloadUsers
          buttonText={'Создать пользователя'}
          skipRatingInput={false}
          onSuccess={handleSuccessCreate}
        />
      </DialogContent>
    </>
  );
}

export default CreateUserModal;
