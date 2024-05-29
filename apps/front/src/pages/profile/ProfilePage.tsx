import React from 'react';
import { useNavigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import StarsIcon from '@mui/icons-material/Stars';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { useParams } from 'react-router-dom';
import { useProfileInfoQuery } from '../../core/api';
import { InfoSection, MiniCard } from '../../shared/components';
import RatingChart from './components/RatingChart/RatingChart';
import Stack from '@mui/material/Stack/Stack';
import WinPercentCard from './components/WinPercentCard/WinPercentCard';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { useSetAtom } from 'jotai';
import { resetServeAtom } from '../tour/modals/components/ScoreBlock/state/Serve.state';
import { useBackButton } from '../../layouts/MainLayout';


type TProfileParams = {
  id: string
}

function ProfilePage() {
  const params = useParams<TProfileParams>();

  const navigate = useNavigate();

  const resetServe = useSetAtom(resetServeAtom);

  const { data: profile } = useProfileInfoQuery(params?.id ?? 0);

  useBackButton({
    title: 'Назад',
    link: () => navigate(-1)
  });

  return (
    <React.Fragment>
      <Typography variant={'h1'} align={'center'} mb={4}>
        {profile?.user.fullName}
      </Typography>

      <Stack spacing={3} p={4}>
        {
          profile?.user &&
          <InfoSection
            title={`Личный рейтинг (${Math.round(profile.user.rating)})`}
            icon={<StarsIcon color={'warning'} />}
          >
            <RatingChart user={profile.user} />
          </InfoSection>
        }

        {
          profile &&
          <InfoSection
            title={'Статистика'}
            icon={<AnalyticsIcon color={'info'} />}
          >
            <Box
              display={'grid'}
              gridTemplateColumns={'repeat(2, 1fr)'}
              gap={2}
            >
              <WinPercentCard {...profile.winPercent} />

              <MiniCard
                label={'Количество игр'}
                value={profile.gamesCount}
              />
            </Box>

          </InfoSection>
        }

        <InfoSection
          title={'Настройки'}
          icon={<AnalyticsIcon color={'info'} />}
        >
          <Button variant={'contained'} onClick={resetServe}>Сбросить состояние подач</Button>
        </InfoSection>
      </Stack>

    </React.Fragment>
  );

}

export default ProfilePage;
