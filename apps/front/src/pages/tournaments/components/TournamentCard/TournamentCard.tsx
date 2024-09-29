import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Typography } from '@mui/material';
import { parseISOWithFormat } from '@tennis-stats/helpers';
import { ETournamentStatus } from '@tennis-stats/types';
import { MouseEvent } from 'react';
import { useUserPermissions } from '../../../../shared/hooks';
import useUpsertTournamentModal from '../../hooks/useUpsertTournamentModal';
import TournamentStatusChip from './components/StatusChip/StatusChip';

import Styled from './TournamentCard.styles';
import { TProps } from './types/TournamentCard.types';

function TournamentCard(props: TProps) {
  const permissions = useUserPermissions();
  const tournamentModal = useUpsertTournamentModal(
    props.type === 'data'
      ? { playersCount: props.tournament.playersCount }
      : undefined
  );

  const handleCardClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    tournamentModal.open();
  };

  if (props.type === 'add-new') {
    return (
      <Styled.Card onClick={() => props.onClick?.()}>
        <AddIcon style={{ fontSize: 40 }} />
      </Styled.Card>
    );
  }

  const showEditButton =
    props.tournament.status === ETournamentStatus.REGISTRATION &&
    permissions.canCrudTournament;

  return (
    <Styled.Card onClick={() => props.onClick?.()}>
      <Styled.CardContent>
        <Styled.CardHeader>
          <Typography fontWeight={600}>
            {parseISOWithFormat(props.tournament.date, 'dd.MM.yyyy')}
          </Typography>

          <TournamentStatusChip tournament={props.tournament} />

          {showEditButton && (
            <Styled.EditButton onClick={handleCardClick}>
              <EditIcon />
            </Styled.EditButton>
          )}
        </Styled.CardHeader>
      </Styled.CardContent>
    </Styled.Card>
  );
}

export default TournamentCard;
