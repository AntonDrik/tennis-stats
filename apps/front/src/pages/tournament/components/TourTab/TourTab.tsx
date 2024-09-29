import { Box, Stack } from '@mui/material';
import { ITour } from '@tennis-stats/types';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { updateTournamentAtom } from '../../../../core/store';
import MatchCard from '../../../../shared/components/MatchCard/MatchCard';

interface IProps {
  tour: ITour;
}

function TourTab(props: IProps) {
  const updateTournamentState = useSetAtom(updateTournamentAtom);

  useEffect(() => {
    updateTournamentState({ selectedTour: props.tour });
  }, [props.tour]);

  return (
    <Box height={'100%'} overflow={'auto'}>
      <Stack spacing={2.5}>
        {props.tour.matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </Stack>
    </Box>
  );
}

export default TourTab;
