import { Button } from '@radix-ui/themes';
import React from 'react';
import useResetRatingMutation from '../../core/api/user/useResetRatingMutation';
import { Page, useConfirmModal } from '../../shared/components';

function SettingsPage() {
  const resetRating = useResetRatingMutation();

  const confirmUnregister = useConfirmModal({
    title: 'Сброс рейтинга',
    description: 'Вы действительно хотите сбросить рейтинг?',
    confirmTitle: 'Да, сбросить',
    denyTitle: 'Назад',
  });

  const handleResetRating = () => {
    confirmUnregister(() => {
      resetRating.mutate();
    });
  };

  return (
    <Page title={`Настройки`}>
      <Button onClick={handleResetRating}>Сбросить рейтинг до 1000</Button>
    </Page>
  );
}

export default SettingsPage;
