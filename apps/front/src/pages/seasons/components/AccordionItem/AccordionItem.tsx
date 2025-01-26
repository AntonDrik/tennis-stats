import { AccordionContent } from '@radix-ui/react-accordion';
import { Badge, Flex, Heading, Text } from '@radix-ui/themes';
import { ESeasonStatus, ISeasonWithStats } from '@tennis-stats/types';
import { Accordion } from 'radix-ui';
import React from 'react';
import { useGetSeasonDateCaption } from '../../../../shared/components';
import { ChevronDownIcon } from '../../../../shared/svg-icons';
import SeasonActionsMenu from '../SeasonActionsMenu/SeasonActionsMenu';

import './styles.scss';
import SeasonUsersTable from '../SeasonUsersTable/SeasonUsersTable';
import SeasonWinnersCard from '../SeasonWinnersCard/SeasonWinnersCard';

interface IProps {
  season: ISeasonWithStats;
  canCrudSeasons: boolean;
}

function SeasonAccordionItem(props: IProps) {
  const { season } = props;

  const getDateCaption = useGetSeasonDateCaption();

  const showActionsMenu = season.status === ESeasonStatus.ACTIVE && props.canCrudSeasons;

  const getStatusBadge = () => {
    if (season.status === ESeasonStatus.ACTIVE) {
      return <Badge color="blue">Активный</Badge>;
    }

    if (season.status === ESeasonStatus.FINISHED) {
      return <Badge color="green">Завершен</Badge>;
    }

    return null;
  };

  return (
    <Accordion.Item
      className={'AccordionItem'}
      data-type={season.status}
      value={season.id.toString()}
    >
      <Accordion.Header>
        <Accordion.Trigger className={'AccordionTrigger'}>
          <Flex gap={'2'} align={'center'} direction={'row'}>
            <Text size={'3'}>{getDateCaption(season)}</Text>
            {getStatusBadge()}

            {showActionsMenu && <SeasonActionsMenu season={season} />}
          </Flex>

          <ChevronDownIcon width={20} height={20} />
        </Accordion.Trigger>
      </Accordion.Header>

      <AccordionContent className={'AccordionContent'}>
        <Flex gap={'4'} direction={'column'}>
          {season.leaderboard.length > 0 && <SeasonWinnersCard season={season} />}

          <Flex direction={'column'} gap={'2'}>
            <Heading size={'2'}>Общая статистика</Heading>

            <SeasonUsersTable season={season} itemsPerPage={10} />
          </Flex>
        </Flex>
      </AccordionContent>
    </Accordion.Item>
  );
}

export default SeasonAccordionItem;
