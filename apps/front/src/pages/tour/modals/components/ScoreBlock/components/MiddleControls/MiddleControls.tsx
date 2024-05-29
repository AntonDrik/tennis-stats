import { Box, IconButton } from '@mui/material';
import Divider from '@mui/material/Divider';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import Stack from '@mui/material/Stack';
import * as React from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { randomizeServeAtom, serveAtom } from '../../state/Serve.state';

import Styled from './MiddleControls.styles';

interface IProps {
  interactive?: boolean;
  onRevertClick: () => void;
}

function MiddleControls(props: IProps) {

  const serve = useAtomValue(serveAtom);
  const randomize = useSetAtom(randomizeServeAtom);

  return (
    <Stack alignItems={'center'}>
      {
        !serve.player && props.interactive &&
        <Styled.RandomIconButton
          color={'info'}
          $animate={serve.animate}
          onClick={randomize}
        />
      }

      <Box flex={1}>
        <Divider
          orientation={'vertical'}
          variant='middle'
          sx={{ my: 0 }}
        >
          {
            props.interactive &&
            <IconButton size={'small'} onClick={props.onRevertClick}>
              <SyncAltIcon fontSize={'small'} />
            </IconButton>
          }
        </Divider>
      </Box>
    </Stack>
  );

}

export default MiddleControls;
