import { Flex } from '@radix-ui/themes';
import { ITour } from '@tennis-stats/types';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { highlightMatchAtom, updateTournamentStateAtom } from '../../../../core/store';
import { MatchCard } from '../../../../shared/components/Tournament';
import useScrollMatchIntoView from '../../hooks/useScrollMatchIntoView';

interface IProps {
  tour: ITour;
}

function TourTab(props: IProps) {
  const updateTournamentState = useSetAtom(updateTournamentStateAtom);
  const matchIdForHighlight = useAtomValue(highlightMatchAtom);

  useScrollMatchIntoView(matchIdForHighlight);

  useEffect(() => {
    updateTournamentState({ selectedTour: props.tour });
  }, [props.tour]);

  return (
    <Flex direction={'column'} height={'100%'} overflow={'auto'} gap={'2'}>
      {props.tour.matches.map((match) => (
        <MatchCard key={match.id} match={match} highlight={matchIdForHighlight === match.id} />
      ))}
    </Flex>
  );
}

export default TourTab;
