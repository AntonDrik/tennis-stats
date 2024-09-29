import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLoginMutation from '../../../../core/api/authApi/useLoginMutation';
import { updateMeStore } from '../../../../core/store';
import { appRoutes } from '../../../../routes/routes.constant';
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
    <Stack gap={2}>
      <TextField
        placeholder={'Введите логин'}
        value={login}
        onChange={(e) => setLogin(e.target.value as string)}
      />

      <TextField
        placeholder={'Введите пароль'}
        value={password}
        type={'password'}
        onChange={(e) => setPassword(e.target.value as string)}
      />

      <Box mt={2}>
        <Button fullWidth variant={'contained'} onClick={handleClick}>
          Войти
        </Button>
      </Box>
    </Stack>
  );
}

export default Login;
