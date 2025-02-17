import { Badge, Flex, Heading } from '@radix-ui/themes';
import { ETourType, IExtendedPairMatch, IMatch, ITour } from '@tennis-stats/types';
import { format } from 'date-fns/format';
import queryString from 'query-string';
import React from 'react';
import { appRoutes } from '../../../../../../routes/routes.constant';
import { MatchCard } from '../../../../../../shared/components/Tournament';
import { ExternalLink } from '../../../../../../shared/svg-icons';

import './styles.scss';

const stages: Record<string, string> = {
  '1/1': 'Финал',
  '1/2': 'Полуфинал',
};

interface IProps {
  matches: IExtendedPairMatch[] | undefined;
}

function PairMatchesList(props: IProps) {
  const getTourCaption = (tour: ITour): string => {
    if (tour.type === ETourType.SIMPLE) {
      return `${tour.number} тур`;
    }

    const stage = stages[tour.playOffStage as string] ?? tour.playOffStage;

    return `${stage} плейоффа`;
  };

  const handleMatchClick = (tournamentId: number, match: IMatch) => {
    const params = queryString.stringify({ matchId: match.id });

    const url = `${window.location.origin}${appRoutes.TOURNAMENT_BY_ID(tournamentId)}?${params}`;
    window.open(url, '_blank');
  };

  return (
    <Flex direction={'column'} gap={'2'}>
      <Heading size={'3'}>Матчи</Heading>

      <Flex direction={'column'} gap={'4'}>
        {props.matches?.map(({ tournament, ...match }) => (
          <Flex key={`pair-match${match.id}`} direction={'column'} className={'pairs-match-card'}>
            <Badge
              className={'pairs-match-card__title'}
              color={match.isPlayoff ? 'purple' : 'indigo'}
              onClick={() => handleMatchClick(tournament.id, match)}
            >
              {format(tournament.date, 'dd.MM.yyyy')} | {getTourCaption(match.tour)}
              <ExternalLink />
            </Badge>

            <MatchCard key={match.id} match={match} readOnly />
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}

export default PairMatchesList;
