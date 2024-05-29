import { Box, Stack, Typography } from '@mui/material';
import { IGameSet } from '@tennis-stats/types';
import { ReactElement } from 'react';
import { usePermissions } from '../../../../../hooks';
import ScoreLabel from './components/ScoreLabel/ScoreLabel';
import StatusChip from './components/StatusChip/StatusChip';
import Styled from './GameSetsList.styles';


interface IProps {
  gameSetList: IGameSet[];
  renderMenuCell?: (gameSet: IGameSet) => ReactElement | null;
}


function GameSetsList({ gameSetList, renderMenuCell }: IProps) {

  const permissions = usePermissions();

  const getMenuCell = (set: IGameSet): ReactElement | null => {
    if (!renderMenuCell) {
      return null;
    }

    return renderMenuCell(set);
  };

  return (
    <Box>
      {
        gameSetList.map((set) => (
          <Styled.Row
            key={set.id}
            direction={'row'}
            status={set.status}
          >
            <Box width={'80px'}>
              <Typography variant={'overline'}>{set.number} Сет</Typography>
            </Box>

            <Box width={'160px'}>
              <StatusChip status={set.status} />
            </Box>

            <Box width={'70px'}>
              <Stack direction={'row'}>
                <ScoreLabel player={set.player1} />
                -
                <ScoreLabel player={set.player2} />
              </Stack>
            </Box>

            <Box width={'35px'}>
              {permissions.canCrudGameSet && getMenuCell(set)}
            </Box>
          </Styled.Row>
        ))
      }
    </Box>
  );

}

export default GameSetsList;

