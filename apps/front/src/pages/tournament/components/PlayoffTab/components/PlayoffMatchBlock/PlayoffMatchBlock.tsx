import { IMatch } from '@tennis-stats/types';
import MatchCard from '../../../../../../shared/components/Tournament/MatchCard/MatchCard';
import Styled from './PlayoffMatchBlock.styles';

interface IProps {
  roundNumber: number;
  isFirst: boolean;
  isLast: boolean;
  match: IMatch;
}

function PlayoffMatchBlock(props: IProps) {
  const match = props.match;

  return (
    <Styled.GridBrick>
      {!props.isFirst && <Styled.BeforeLine />}
      <MatchCard match={match} isPlayoffCard />
      {!props.isLast && <Styled.AfterLine />}

      {!props.isLast && (
        <Styled.AfterLineVertical
          $roundNumber={props.roundNumber}
          $matchNumber={props.match.number}
        />
      )}
    </Styled.GridBrick>
  );
}

export default PlayoffMatchBlock;
