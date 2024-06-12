import StartIcon from '@mui/icons-material/Start';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { EGameSetStatus } from '@tennis-stats/types';
import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { useStartGameSetMutation } from '../../../../../../core/api';
import { tourPageStateAtom } from '../../../../../../core/store';
import { appRoutes } from '../../../../../../routes/routes.constant';


interface IProps {
  onClick: () => void;
}

function StartSetMenuItem({ onClick }: IProps) {

  const tourPageState = useAtomValue(tourPageStateAtom);

  const startGameSet = useStartGameSetMutation(tourPageState);

  const navigate = useNavigate();

  const isInProcess = tourPageState.selectedGameSet?.status === EGameSetStatus.IN_PROCESS;

  const handleClick = () => {
    onClick();

    if (isInProcess) {
      navigate(appRoutes.GAME_PROCESS);

      return;
    }

    startGameSet
      .mutateAsync()
      .then(() => navigate(appRoutes.GAME_PROCESS));
  };

  return (
    <MenuItem onClick={handleClick}>
      <ListItemIcon>
        <StartIcon color={'primary'} />
      </ListItemIcon>

      <Typography>
        {isInProcess ? 'Продолжить сет' : 'Начать сет'}
      </Typography>
    </MenuItem>
  );

}

export default StartSetMenuItem;
