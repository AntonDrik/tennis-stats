import { useSetAtom } from 'jotai';
import { MouseEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IGameSet, IMatch } from '@tennis-stats/types';

import { tourPageStateAtom } from '../../TourPage.state';
import EditSetMenuItem from './components/EditSetMenuItem/EditSetMenuItem';


interface IProps {
    match: IMatch;
    gameSet: IGameSet;
}

function FinishedGameSetMenu({ match, gameSet }: IProps) {

    const setTourPageState = useSetAtom(tourPageStateAtom);

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const isOpen = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setTourPageState({
            selectedMatch: match,
            selectedGameSet: gameSet
        });

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
              <EditSetMenuItem onClick={handleClose}/>
            </Menu>
        </Box>

    );

}

export default FinishedGameSetMenu;
