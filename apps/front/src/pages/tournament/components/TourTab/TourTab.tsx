import { Flex } from '@radix-ui/themes';
import { ITour } from '@tennis-stats/types';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { updateTournamentStateAtom } from '../../../../core/store';
import { MatchCard } from '../../../../shared/components/Tournament';

interface IProps {
  tour: ITour;
}

function TourTab(props: IProps) {
  const updateTournamentState = useSetAtom(updateTournamentStateAtom);

  useEffect(() => {
    updateTournamentState({ selectedTour: props.tour });
  }, [props.tour]);

  return (
    <Flex direction={'column'} height={'100%'} overflow={'auto'} gap={'2'}>
      {props.tour.matches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </Flex>
  );
}

export default TourTab;
