import { Button, Callout, Flex } from '@radix-ui/themes';
import { Spinner } from '@radix-ui/themes';
import { useAtomValue } from 'jotai';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLoginMutation from '../../../../core/api/auth/useLoginMutation';
import { updateMeStore } from '../../../../core/store';
import { appRoutes } from '../../../../routes/routes.constant';
import { TextField } from '../../../../shared/components';
import { InfoIcon } from '../../../../shared/svg-icons';
import { registrationFormAtom } from '../../state/AuthPage.state';

function Login() {
  const navigate = useNavigate();

  const auth = useLoginMutation();

  const registrationForm = useAtomValue(registrationFormAtom);

  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleClick = () => {
    auth.mutateAsync({ login, password }).then((response) => {
      if (!response.user) {
        return;
      }

      updateMeStore(response.user);
      navigate(appRoutes.TOURNAMENTS);
    });
  };

  useEffect(() => {
    if (registrationForm) {
      setLogin(registrationForm.login);
      setPassword(registrationForm.password);
    }
  }, [registrationForm]);

  return (
    <Flex direction={'column'} gap={'4'}>
      <Callout.Root color="orange" size={'1'}>
        <Callout.Icon>
          <InfoIcon />
        </Callout.Icon>

        <Callout.Text>
          Если вы забыли логин или пароль, обратитесь к администратору.
        </Callout.Text>
      </Callout.Root>

      <TextField
        size={'3'}
        label={'Логин'}
        placeholder="Введите логин"
        value={login}
        onChange={(e) => setLogin(e.target.value as string)}
      />

      <TextField
        size={'3'}
        label={'Пароль'}
        placeholder="Введите пароль"
        value={password}
        type={'password'}
        onChange={(e) => setPassword(e.target.value as string)}
      />

      <Button mt={'3'} size={'3'} disabled={auth.isLoading} onClick={handleClick}>
        <Spinner loading={auth.isLoading} />
        Войти
      </Button>
    </Flex>
  );
}

export default Login;
