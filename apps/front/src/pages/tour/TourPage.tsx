import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ms from 'ms';
import { useParams } from 'react-router-dom';
import { useGetTourQuery } from '../../core/api';
import { useBackButton } from '../../layouts/MainLayout';
import { appRoutes } from '../../routes/routes.constant';
import { Page, Spinner } from '../../shared/components';

type IRouteParams = {
  id: string;
};

function TourPage() {
  const params = useParams<IRouteParams>();

  const { data: tour, isLoading } = useGetTourQuery(params?.id ?? 0, {
    refetchInterval: ms('5s'),
  });

  useBackButton({
    title: 'К списку туров',
    link: appRoutes.TOURNAMENTS,
  });

  return (
    <Page title={tour ? `${tour.id} Тур` : 'Тур'}>
      {isLoading && <Spinner page />}

      <Box height={'100%'} overflow={'auto'}>
        <Stack spacing={3}></Stack>
      </Box>
    </Page>
  );
}

export default TourPage;
