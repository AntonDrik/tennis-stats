import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { EGameSetStatus } from '@tennis-stats/types';
import { useAtomValue, useSetAtom } from 'jotai';

import { useFinishGameSetMutation } from '../../../../../../core/api';
import { tourPageStateAtom } from '../../../../../../core/store';
import { resetServeAtom } from '../../../../../../shared/components/GameSet/ScoreBlock/state/Serve.state';
import { useConfirmModal } from '../../../../../../shared/components/Modals';


interface IProps {
  onClick: () => void;
}

function CancelSetMenuItem({ onClick }: IProps) {

  const clearServe = useSetAtom(resetServeAtom);
  const tourPageState = useAtomValue(tourPageStateAtom);

  const finishGameSet = useFinishGameSetMutation(tourPageState);

  const cancelConfirm = useConfirmModal({
    title: 'Вы действительно хотите отменить игру?',
    confirmTitle: 'Да, отменить',
    denyTitle: 'Нет, выйти'
  });

  const handleClick = () => {
    onClick();

    cancelConfirm(() => {
      void finishGameSet.mutateAsync({
        player1Score: 0,
        player2Score: 0,
        status: EGameSetStatus.CANCELED
      }).then(clearServe);
    });
  };

  return (
    <MenuItem onClick={handleClick}>
      <ListItemIcon>
        <HighlightOffIcon color={'error'} />
      </ListItemIcon>

      <Typography color={'#CE2C31'}>Отменить сет</Typography>
    </MenuItem>
  );

}

export default CancelSetMenuItem;
