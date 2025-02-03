import React, { ChangeEvent, useState } from 'react';
import { Button, Callout, Flex, Heading, Spinner, Strong } from '@radix-ui/themes';
import { toast } from 'react-hot-toast';
import { useResetPasswordMutation, useChangeUserRatingMutation } from '../../../../core/api';
import { TextField, useConfirmModal } from '../../../../shared/components';

import '../../styles.scss';
import { InfoIcon } from '../../../../shared/svg-icons';
import { ITabContentProps } from '../../types/tab-props';

function AdminSettings(props: ITabContentProps) {
  const userId = props.user.id;

  const [newRating, setNewRating] = useState<number | undefined>(props.user.rating);

  const resetPassword = useResetPasswordMutation();
  const changeUserRating = useChangeUserRatingMutation();

  const confirmResetPassword = useConfirmModal({
    title: 'Вы действительно хотите сбросить пароль?',
    confirmTitle: 'Да, сбросить',
    denyTitle: 'Нет, отменить',
  });

  const handleResetPassword = () => {
    confirmResetPassword(() => {
      resetPassword.mutateAsync({ id: userId }).then(() => {
        toast.success('Пароль успешно сброшен. Временный пароль: 1234');
      });
    });
  };

  const handleChangeUserRating = () => {
    if (newRating === undefined) {
      return;
    }

    changeUserRating.mutateAsync({ userId, newRating }).then(() => {
      toast.success('Рейтинг успешно изменен');
    });
  };

  const handleChangeRatingInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setNewRating(undefined);

      return;
    }

    setNewRating(Number(e.target.value));
  };

  return (
    <Flex className={'settings-wrapper'} gap={'4'}>
      <Flex className={'setting-card'} direction={'column'} gap={'4'}>
        <Heading size={'3'}>Сброс пароля</Heading>

        <Callout.Root color={'orange'}>
          <Callout.Icon>
            <InfoIcon />
          </Callout.Icon>

          <Callout.Text>
            Дефолтный пароль: <Strong>1234</Strong>
          </Callout.Text>
        </Callout.Root>

        <Button onClick={handleResetPassword}>Сбросить</Button>
      </Flex>

      <Flex className={'setting-card'} direction={'column'} gap={'4'}>
        <Heading size={'3'}>Изменение рейтинга</Heading>

        <Flex direction={'column'} gap={'2'}>
          <TextField
            size={'3'}
            label={'Новый рейтинг'}
            type={'number'}
            placeholder="Введите новый рейтинг"
            value={newRating}
            onChange={handleChangeRatingInput}
          />

          <Button mt={'2'} disabled={changeUserRating.isLoading} onClick={handleChangeUserRating}>
            {changeUserRating.isLoading && <Spinner />}
            Сохранить
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default AdminSettings;
