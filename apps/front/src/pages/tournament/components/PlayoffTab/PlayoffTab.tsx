import { ScrollArea } from '@radix-ui/themes';
import { ETourType, ITour, ITournament } from '@tennis-stats/types';
import { useAtomValue } from 'jotai/index';
import { useMemo, useRef } from 'react';
import { highlightMatchAtom } from '../../../../core/store';
import useScrollMatchIntoView from '../../hooks/useScrollMatchIntoView';
import PlayoffMatchBlock from './components/PlayoffMatchBlock/PlayoffMatchBlock';
import Styled from './PlayoffTab.styles';

interface IProps {
  tournament: ITournament;
}

function PlayoffTab(props: IProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const matchIdForHighlight = useAtomValue(highlightMatchAtom);

  const playoffTours = useMemo(() => {
    return props.tournament.tours.filter((tour) => tour.type === ETourType.PLAY_OFF).sort(byStage);
  }, [props.tournament.tours]);

  useScrollMatchIntoView(matchIdForHighlight, containerRef);

  return (
    <ScrollArea ref={containerRef} scrollbars="horizontal" style={{ maxWidth: '100%' }}>
      <Styled.Container>
        {playoffTours.map((tour, index) => (
          <Styled.Column
            key={`playoff-tour-${tour.id}`}
            $isLast={index === playoffTours.length - 1}
          >
            {tour.matches.map((match) => (
              <PlayoffMatchBlock
                key={`playoff-match-${match.id}`}
                match={match}
                roundNumber={index + 1}
                isFirst={!index}
                isLast={index === playoffTours.length - 1}
                highlight={matchIdForHighlight === match.id}
              />
            ))}
          </Styled.Column>
        ))}
      </Styled.Container>
    </ScrollArea>
  );
}

export default PlayoffTab;

function byStage(a: ITour, b: ITour) {
  const aRound = Number(a.playOffStage?.split('/')[1]);
  const bRound = Number(b.playOffStage?.split('/')[1]);

  return bRound - aRound;
}
