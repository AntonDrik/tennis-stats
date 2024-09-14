import { Stack, Typography } from '@mui/material';
import { TScore } from '@tennis-stats/types';
import { useAtomValue, useSetAtom } from 'jotai';
import * as React from 'react';
import { useIsMutating } from 'react-query';
import { Navigate, useNavigate } from 'react-router-dom';
import { useUpdateGameSetScoreMutation } from '../../core/api';
import { tourPageStateAtom } from '../../core/store';
import { useBackButton } from '../../layouts/MainLayout';
import { appRoutes } from '../../routes/routes.constant';
import { Spinner } from '../../shared/components';
import FinishButton from '../../shared/components/GameSet/FinishButton/FinishButton';
import ScoreBlock from '../../shared/components/GameSet/ScoreBlock/ScoreBlock';
import { resetServeAtom } from '../../shared/components/GameSet/ScoreBlock/state/Serve.state';
import Rating from './components/Rating/Rating';
import Stats from './components/Stats/Stats';

import Styled from './GameProcessPage.styles';

function GameProcessPage() {

  const navigate = useNavigate();

  const clearServe = useSetAtom(resetServeAtom);
  const tourPageState = useAtomValue(tourPageStateAtom);

  const isMutating = useIsMutating(['finish-game-set']);
  const updateScore = useUpdateGameSetScoreMutation(tourPageState);

  const handleScoreChange = (score: [TScore, TScore]) => {
    updateScore.mutate({
      player1Score: score[0],
      player2Score: score[1]
    });
  };

  const handleSuccessFinish = () => {
    clearServe();
    navigate(-1);
  };

  useBackButton({
    title: 'Назад',
    link: () => navigate(-1)
  });

  if (!tourPageState.selectedMatch) {
    return <Navigate to={appRoutes.TOURS_LIST} />;
  }

  return (
    <Stack gap={2}>

      <Rating matchId={tourPageState.selectedMatch?.id ?? 0} />

      <Styled.Body position={'relative'}>
        {isMutating > 0 && <Spinner />}

        {
          tourPageState.selectedGameSet &&
          <Stack justifyContent={'center'} alignItems={'center'} direction={'row'} pb={1}>
            <Typography variant={'h4'} align={'center'}>
              Сет № {tourPageState.selectedGameSet.number}
            </Typography>
          </Stack>
        }

        <ScoreBlock
          interactive
          refetchIntervalMs={3000}
          tourPageState={tourPageState}
          onChange={handleScoreChange}
        />

        <FinishButton
          tourPageState={tourPageState}
          onSuccess={handleSuccessFinish}
        />
      </Styled.Body>

      <Stats />

    </Stack>
  );
}

export default GameProcessPage;
