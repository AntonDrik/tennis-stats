import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import * as React from 'react';

function MiddleControls() {
  return (
    <Stack alignItems={'center'}>
      <Box flex={1}>
        <Divider orientation={'vertical'} variant="middle" sx={{ my: 0 }} />
      </Box>
    </Stack>
  );
}

export default MiddleControls;
