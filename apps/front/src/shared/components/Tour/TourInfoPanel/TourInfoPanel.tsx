import { Stack, Typography } from '@mui/material';
import { parseISOWithFormat } from '@tennis-stats/helpers';
import { ITour } from '@tennis-stats/types';
import { useIsMutating } from 'react-query';
import { usePermissions } from '../../../hooks';
import Spinner from '../../Spinner/Spinner';
import ButtonsBlock from './components/ButtonsBlock/ButtonsBlock';
import TourLabel from './components/Label/Label';
import Styled from './TourInfoPanel.styles';


interface IProps {
  tour: ITour;
}

function TourInfoPanel({ tour }: IProps) {

  const isCanceling = useIsMutating('cancel-tour');
  const permissions = usePermissions();

  const dateCaption = () => {
    const formattedDate = parseISOWithFormat(tour.date, 'dd MMM yyyy HH:mm');

    if (tour.isActive) {
      return `Начало тура: ${formattedDate}`;
    }

    return formattedDate;
  };

  return (
    <Styled.Wrapper direction={'row'}>
      {isCanceling > 0 && <Spinner />}

      <Stack direction={'column'}>

        <TourLabel tour={tour} />

        <Typography
          variant={'subtitle2'}
          sx={{ opacity: 0.7, mt: 0.5 }}
        >
          {dateCaption()}
        </Typography>
      </Stack>

      {
        (tour.isActive && permissions.canCrudTour) &&
        <ButtonsBlock tour={tour} />
      }

    </Styled.Wrapper>
  );

}

export default TourInfoPanel;
