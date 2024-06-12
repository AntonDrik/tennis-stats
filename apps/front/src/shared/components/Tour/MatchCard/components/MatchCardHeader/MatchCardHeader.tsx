import Typography from '@mui/material/Typography';
import { EGameSetStatus, IMatch } from '@tennis-stats/types';
import Styled from './MatchCardHeader.styles';
import { RatingDeltaPopover } from '../../../RatingDelta';


interface IProps {
  match: IMatch;
}

function MatchCardHeader({ match }: IProps) {

  const { user1, user2, totalScore } = match;

  const isActive = match.gameSets.some((gameSet) => {
    return [EGameSetStatus.READY_TO_START, EGameSetStatus.IN_PROCESS].includes(gameSet.status);
  });

  return (
    <Styled.Wrapper direction={'row'}>
      <Styled.TextWrapper $withPadding={isActive}>
        <Typography variant={'subtitle1'} noWrap>
          {user1.shortFullName} - {user2.shortFullName}
        </Typography>

        <Typography variant={'body1'} sx={{ opacity: 0.7 }}>
          Счет матча: {totalScore?.user1} - {totalScore?.user2}
        </Typography>
      </Styled.TextWrapper>

      {isActive && <RatingDeltaPopover match={match} />}
    </Styled.Wrapper>
  );

}

export default MatchCardHeader;
