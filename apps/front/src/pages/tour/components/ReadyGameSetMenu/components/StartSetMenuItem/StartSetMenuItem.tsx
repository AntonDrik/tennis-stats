import StartIcon from '@mui/icons-material/Start';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { EGameSetStatus } from '@tennis-stats/types';
import { useAtomValue } from 'jotai';
import { useStartGameSetMutation } from '../../../../../../core/api';
import { useModal } from '../../../../../../shared/components';
import InProcessGameSetModal from '../../../../modals/InProcessGameSetModal/InProcessGameSetModal';
import { tourPageStateAtom } from '../../../../TourPage.state';


interface IProps {
  onClick: () => void;
}

function StartSetMenuItem({ onClick }: IProps) {

  const { selectedMatch, selectedGameSet } = useAtomValue(tourPageStateAtom);

  const startGameSet = useStartGameSetMutation(selectedMatch?.id, selectedGameSet?.id);

  const modal = useModal();

  const isInProcess = selectedGameSet?.status === EGameSetStatus.IN_PROCESS;

  const openModal = () => {
    modal.open(<InProcessGameSetModal />, { maxWidth: 'sm' });
  };

  const handleClick = () => {
    onClick();

    if (isInProcess) {
      openModal();

      return;
    }

    startGameSet
      .mutateAsync()
      .then(openModal);
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
