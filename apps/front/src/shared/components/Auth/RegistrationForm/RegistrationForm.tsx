import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Button, Flex, Spinner as RadixSpinner } from '@radix-ui/themes';
import { RegistrationDto } from '@tennis-stats/dto';
import { useEffect } from 'react';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useRegistrationMutation } from '../../../../core/api';
import { getTextFieldError } from '../../../../utils';
import { TextField } from '../../Inputs';

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

  const submit = (form: RegistrationDto) => {
    mutateAsync(form).then(() => {
      toast.success('Регистрация выполнена!');
      props.onSuccess?.(form);
    });
  };

  useEffect(() => {
    form.setValue('rating', 100);
  }, []);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        <Flex direction={'column'} gap={'4'}>
          <TextField
            size={'3'}
            label={'Логин'}
            placeholder="Введите логин"
            {...form.register('login')}
            {...getTextFieldError(form.formState.errors, 'login')}
          />

          <TextField
            size={'3'}
            label="Пароль"
            type={'password'}
            placeholder="Введите пароль"
            {...form.register('password')}
            {...getTextFieldError(form.formState.errors, 'password')}
          />

          <TextField
            size={'3'}
            label="Никнейм"
            placeholder="Введите ник"
            {...form.register('nickname')}
            {...getTextFieldError(form.formState.errors, 'nickname')}
          />

          {!props.skipRatingInput && (
            <TextField
              size={'3'}
              type={'number'}
              label="Стартовый рейтинг"
              placeholder="Введите рейтинг"
              {...form.register('rating', { valueAsNumber: true })}
              {...getTextFieldError(form.formState.errors, 'rating')}
            />
          )}

          <Button type={'submit'} size={'3'} mt={'3'} disabled={isLoading}>
            <RadixSpinner loading={isLoading} />
            {props.buttonText}
          </Button>
        </Flex>
      </form>
    </FormProvider>
  );
}

export default RegistrationForm;
