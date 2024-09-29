import { ETourType, ITournament } from '@tennis-stats/types';
import { useEffect, useMemo } from 'react';

interface IProps {
  tournament: ITournament;
}

function PlayoffTab(props: IProps) {
  const playoffTours = useMemo(() => {
    return props.tournament.tours.filter(
      (tour) => tour.type === ETourType.PLAY_OFF
    );
  }, [props.tournament.tours]);

  useEffect(() => {
    console.log(playoffTours);
  }, [playoffTours]);

  return <span>123</span>;
}

export default PlayoffTab;
