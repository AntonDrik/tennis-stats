import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import { EGameSetStatus } from '@tennis-stats/types';
import { useAtomValue } from 'jotai';
import { MouseEvent, useState } from 'react';
import { tourPageStateAtom } from '../../../../core/store';

import CancelSetMenuItem from './components/CancelSetMenuItem/CancelSetMenuItem';
import FinishSetMenuItem from './components/FinishSetMenuItem/FinishSetMenuItem';
import StartSetMenuItem from './components/StartSetMenuItem/StartSetMenuItem';


function ReadyGameSetMenu() {

  const tourPageState = useAtomValue(tourPageStateAtom);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        elevation={10}
        onClose={handleClose}
      >
        <StartSetMenuItem onClick={handleClose} />

        {
          tourPageState.selectedGameSet?.status !== EGameSetStatus.IN_PROCESS &&
          <FinishSetMenuItem onClick={handleClose} />
        }

        <CancelSetMenuItem onClick={handleClose} />
      </Menu>
    </Box>

  );

}

export default ReadyGameSetMenu;
