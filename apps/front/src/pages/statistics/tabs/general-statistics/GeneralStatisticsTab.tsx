import Box from '@mui/material/Box';
import { useRatingHistoryQuery, useCommonStatisticQuery } from '../../../../core/api';
import { InfoSection, MiniCard } from '../../../../shared/components';
import Chart from './components/Chart/Chart';
import StarsIcon from '@mui/icons-material/Stars';
import InfoIcon from '@mui/icons-material/Info';
import Stack from '@mui/material/Stack';


function GeneralStatisticsTab() {

  const ratingQuery = useRatingHistoryQuery();
  const gamesStatsQuery = useCommonStatisticQuery();

  return (
    <Box width={'100%'} height={'100%'}>

      <Stack spacing={3}>
        {
          (ratingQuery.data && ratingQuery.data.length > 0) &&
          <InfoSection title={'Рейтинг'} icon={<StarsIcon color={'warning'} />}>
            <Chart data={ratingQuery.data} />
          </InfoSection>
        }

        {
          gamesStatsQuery.data &&
          <InfoSection title={'Данные по всем играм'} icon={<InfoIcon color={'info'} />}>
            <Box
              display={'grid'}
              gridTemplateColumns={'repeat(2, 1fr)'}
              gap={2}
            >
              <MiniCard
                label={'Сыграно игр'}
                value={gamesStatsQuery.data.gamesCount}
              />

              <MiniCard
                label={'Сыграно допов'}
                value={gamesStatsQuery.data.additionsCount}
              />

              <MiniCard
                label={'Самый частый счет'}
                value={gamesStatsQuery.data.mostPopularScore}
              />

              <MiniCard
                label={'Общее время проведенное в игре'}
                value={gamesStatsQuery.data.inGameTime.split(',')}
              />

            </Box>
          </InfoSection>
        }

      </Stack>

    </Box>
  );

}

export default GeneralStatisticsTab;
