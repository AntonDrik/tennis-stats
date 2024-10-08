import { RegistrationDto } from '@tennis-stats/dto';
import { useSetAtom } from 'jotai';
import * as React from 'react';
import { RegistrationForm } from '../../../../shared/components/Auth';
import { toast } from 'react-hot-toast';
import {
  authPageSelectedTabAtom,
  registrationFormAtom,
} from '../../state/AuthPage.state';

function Registration() {
  const setSelectedTab = useSetAtom(authPageSelectedTabAtom);
  const setRegistrationForm = useSetAtom(registrationFormAtom);

  const handleSuccessRegistration = (form: RegistrationDto) => {
    toast.success('Вы успешно зарегистрировались');

    setRegistrationForm(form);
    setSelectedTab('login');
  };

  return (
    <RegistrationForm
      buttonText={'Зарегистрироваться'}
      skipRatingInput={true}
      onSuccess={handleSuccessRegistration}
    />
  );
}

export default Registration;
