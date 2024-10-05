import { ETourType, ITour, ITournament } from '@tennis-stats/types';
import { useMemo } from 'react';
import PlayoffMatchBlock from './components/PlayoffMatchBlock/PlayoffMatchBlock';
import Styled from './PlayoffTab.styles';

interface IProps {
  tournament: ITournament;
}

function PlayoffTab(props: IProps) {
  const playoffTours = useMemo(() => {
    return props.tournament.tours
      .filter((tour) => tour.type === ETourType.PLAY_OFF)
      .sort(byRound);
  }, [props.tournament.tours]);

  return (
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
            />
          ))}
        </Styled.Column>
      ))}
    </Styled.Container>
  );
}

export default PlayoffTab;

function byRound(a: ITour, b: ITour) {
  const aRound = Number(a.playOffStage?.split('/')[1]);
  const bRound = Number(b.playOffStage?.split('/')[1]);

  return bRound - aRound;
}
