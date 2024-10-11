import { Dialog } from '@radix-ui/themes';
import * as React from 'react';
import { useModal } from '../../../../shared/components';
import { RegistrationForm } from '../../../../shared/components/Auth';
import { DialogCloseButton } from '../../../../shared/components/Modals';

function CreateUserModal() {
  const modal = useModal();

  const handleSuccessCreate = () => modal.close();

  return (
    <Dialog.Content>
      <DialogCloseButton />

      <Dialog.Title>Создание пользователя</Dialog.Title>

      <RegistrationForm
        reloadUsers
        buttonText={'Создать пользователя'}
        skipRatingInput={false}
        onSuccess={handleSuccessCreate}
      />
    </Dialog.Content>
  );
}

export default CreateUserModal;
