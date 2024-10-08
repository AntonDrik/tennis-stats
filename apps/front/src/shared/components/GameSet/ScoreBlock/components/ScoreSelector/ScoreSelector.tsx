import { AspectRatio, Grid } from '@radix-ui/themes';
import { createArray } from '@tennis-stats/helpers';

import Styled from './ScoreSelector.styles';

interface IProps {
  value: number;
  onChange: (value: number) => void;
}

function ScoreSelector(props: IProps) {
  const availableScore = createArray(12);

  return (
    <Grid columns={'3'} gap={'2'} pb={'0'}>
      {availableScore.map((score) => (
        <AspectRatio key={`available-score-${score}`}>
          <Styled.ScoreItem
            $isSelected={props.value === score}
            variant={'soft'}
            size={'3'}
            style={{ width: '100%', height: '100%' }}
            onClick={() => props.onChange(score)}
          >
            {score}
          </Styled.ScoreItem>
        </AspectRatio>
      ))}
    </Grid>
  );
}

export default ScoreSelector;
