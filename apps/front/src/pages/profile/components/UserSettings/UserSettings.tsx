import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { ChangePasswordDto } from '@tennis-stats/dto';
import React from 'react';
import { Button, Flex, Heading, Spinner } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useChangePasswordMutation } from '../../../../core/api';
import { getTextFieldError } from '../../../../utils';
import { TextField } from '../../../../shared/components';
import { ITabContentProps } from '../../types/tab-props';

import '../../styles.scss';

function UserSettings(props: ITabContentProps) {
  const changePassword = useChangePasswordMutation();

  const form = useForm<ChangePasswordDto>({
    defaultValues: { userId: props.user.id },
    resolver: classValidatorResolver(ChangePasswordDto),
  });

  const submit = (form: ChangePasswordDto) => {
    changePassword.mutateAsync(form).then(() => {
      toast.success('Пароль изменен');
    });
  };

  return (
    <Flex>
      <Flex className={'setting-card'} direction={'column'} gap={'4'}>
        <Heading size={'3'}>Изменение пароля</Heading>

        <form onSubmit={form.handleSubmit(submit)}>
          <Flex direction={'column'} gap={'2'}>
            <TextField
              size={'3'}
              label={'Старый пароль'}
              type={'password'}
              placeholder="Введите старый пароль"
              {...form.register('oldPassword')}
              {...getTextFieldError(form.formState.errors, 'oldPassword')}
            />

            <TextField
              size={'3'}
              label={'Новый пароль'}
              type={'password'}
              placeholder="Введите новый пароль"
              {...form.register('newPassword')}
              {...getTextFieldError(form.formState.errors, 'newPassword')}
            />

            <TextField
              size={'3'}
              label={'Подтвердите пароль'}
              type={'password'}
              placeholder="Введите пароль еще раз"
              {...form.register('confirmPassword')}
              {...getTextFieldError(form.formState.errors, 'confirmPassword')}
            />

            <Button mt={'2'} type={'submit'} disabled={changePassword.isLoading}>
              {changePassword.isLoading && <Spinner />}
              Сохранить
            </Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
}

export default UserSettings;
