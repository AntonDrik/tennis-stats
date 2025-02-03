import { Flex, Heading, IconButton } from '@radix-ui/themes';
import { ESeasonStatus } from '@tennis-stats/types';
import { Accordion } from 'radix-ui';
import React, { useMemo } from 'react';
import { useGetSeasonsWithStatsQuery } from '../../core/api';
import { Page, Spinner, useModal } from '../../shared/components';
import { useUserPermissions } from '../../shared/hooks';
import useMediaQuery from '../../shared/hooks/useMediaQuery';
import { PlusIcon } from '../../shared/svg-icons';
import SeasonAccordionItem from './components/AccordionItem/AccordionItem';
import CreateSeasonModal from './modals/CreateSeasonModal/CreateSeasonModal';

import './styles.scss';

function SeasonsPage() {
  const seasons = useGetSeasonsWithStatsQuery();

  const modal = useModal();
  const permissions = useUserPermissions();
  const isMobileDevice = useMediaQuery('only screen and (max-width : 576px)');

  const activeSeasonsIds = useMemo(() => {
    if (!seasons.data) {
      return [];
    }

    return seasons.data
      .filter((season) => season.status === ESeasonStatus.ACTIVE)
      .map((season) => String(season.id));
  }, [seasons.data]);

  const handleCreateSeasonClick = () => {
    modal.open(<CreateSeasonModal />);
  };

  if (seasons.isLoading) {
    return <Spinner />;
  }

  return (
    <Page title={`Сезоны`}>
      <Flex direction={'column'}>
        <Flex
          align={'center'}
          mb={'4'}
          gap={'2'}
          width={isMobileDevice ? '100%' : 'auto'}
          justify={isMobileDevice ? 'between' : 'start'}
        >
          <Heading size={'7'}>Сезоны</Heading>

          {permissions.canCrudSeasons && (
            <IconButton color={'green'} onClick={handleCreateSeasonClick}>
              <PlusIcon />
            </IconButton>
          )}
        </Flex>

        <Accordion.Root className={'AccordionRoot'} type="multiple" defaultValue={activeSeasonsIds}>
          {seasons.data?.map((season) => (
            <SeasonAccordionItem
              key={`season-${season.id}`}
              season={season}
              canCrudSeasons={permissions.canCrudSeasons}
            />
          ))}
        </Accordion.Root>
      </Flex>
    </Page>
  );
}

export default SeasonsPage;
