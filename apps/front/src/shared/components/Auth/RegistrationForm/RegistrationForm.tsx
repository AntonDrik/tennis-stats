import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { RegistrationDto } from '@tennis-stats/dto';
import { MuiColorInput } from 'mui-color-input';
import { useEffect } from 'react';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRegistrationMutation } from '../../../../core/api';
import { getTextFieldError } from '../../../../utils';
import { Spinner } from '../../index';

interface IProps {
  skipRatingInput: boolean;
  buttonText: string;
  onSuccess?: (form: RegistrationDto) => void;
  reloadUsers?: boolean;
}

function RegistrationForm(props: IProps) {
  const { mutateAsync, isLoading } = useRegistrationMutation(props.reloadUsers);

  const form = useForm<RegistrationDto>({
    mode: 'onChange',
    resolver: classValidatorResolver(RegistrationDto),
  });

  const colorValue = form.watch('color');

  const submit = (form: RegistrationDto) => {
    mutateAsync(form).then(() => props.onSuccess?.(form));
  };

  useEffect(() => {
    form.setValue(
      'color',
      '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')
    );

    form.setValue('rating', 100);
  }, []);

  return (
    <FormProvider {...form}>
      {isLoading && <Spinner />}

      <form onSubmit={form.handleSubmit(submit)}>
        <Stack spacing={3} pt={2}>
          <TextField
            label="Логин"
            size={'small'}
            {...form.register('login')}
            {...getTextFieldError(form.formState.errors, 'login')}
          />

          <TextField
            label="Пароль"
            size={'small'}
            {...form.register('password')}
            {...getTextFieldError(form.formState.errors, 'password')}
          />

          <TextField
            label="Никнейм"
            size={'small'}
            {...form.register('nickname')}
            {...getTextFieldError(form.formState.errors, 'nickname')}
          />

          {!props.skipRatingInput && (
            <TextField
              label="Стартовый рейтинг"
              InputLabelProps={{ shrink: true }}
              size={'small'}
              {...form.register('rating', { valueAsNumber: true })}
              {...getTextFieldError(form.formState.errors, 'rating')}
            />
          )}

          <MuiColorInput
            value={colorValue}
            format={'hex'}
            label={'Цвет'}
            onChange={(value) => form.setValue('color', value)}
          />
        </Stack>

        <Button fullWidth variant={'contained'} type={'submit'} sx={{ mt: 4 }}>
          {props.buttonText}
        </Button>
      </form>
    </FormProvider>
  );
}

export default RegistrationForm;
