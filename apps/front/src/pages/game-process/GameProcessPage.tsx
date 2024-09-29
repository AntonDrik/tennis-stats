import { Stack, Typography } from '@mui/material';
import { TScore } from '@tennis-stats/types';
import { useAtomValue } from 'jotai';
import * as React from 'react';
import { useIsMutating } from 'react-query';
import { Navigate, useNavigate } from 'react-router-dom';
import { tournamentAtom } from '../../core/store';
import { useBackButton } from '../../layouts/MainLayout';
import { appRoutes } from '../../routes/routes.constant';
import { Spinner } from '../../shared/components';
import FinishButton from '../../shared/components/GameSet/FinishButton/FinishButton';
import ScoreBlock from '../../shared/components/GameSet/ScoreBlock/ScoreBlock';
import Rating from './components/Rating/Rating';

import Styled from './GameProcessPage.styles';

function GameProcessPage() {
  const navigate = useNavigate();

  const tourPageState = useAtomValue(tournamentAtom);

  const isMutating = useIsMutating(['finish-game-set']);

  const handleScoreChange = (score: [TScore, TScore]) => {};

  const handleSuccessFinish = () => navigate(-1);

  useBackButton({
    title: 'Назад',
    link: () => navigate(-1),
  });

  if (!tourPageState.selectedMatch) {
    return <Navigate to={appRoutes.TOURNAMENTS} />;
  }

  return (
    <Stack gap={2}>
      <Rating matchId={tourPageState.selectedMatch?.id ?? 0} />

      <Styled.Body position={'relative'}>
        {isMutating > 0 && <Spinner />}

        {tourPageState.selectedGameSet && (
          <Stack
            justifyContent={'center'}
            alignItems={'center'}
            direction={'row'}
            pb={1}
          >
            <Typography variant={'h4'} align={'center'}>
              Сет № {tourPageState.selectedGameSet.number}
            </Typography>
          </Stack>
        )}

        <ScoreBlock
          tournamentState={tourPageState}
          onChange={handleScoreChange}
        />

        <FinishButton
          tournamentState={tourPageState}
          onSuccess={handleSuccessFinish}
        />
      </Styled.Body>
    </Stack>
  );
}

export default GameProcessPage;
