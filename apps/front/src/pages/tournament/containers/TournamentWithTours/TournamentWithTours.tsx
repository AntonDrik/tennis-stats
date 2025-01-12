import { Box, Tabs } from '@radix-ui/themes';
import { ITournament } from '@tennis-stats/types';
import { useAtom } from 'jotai/index';
import React, { useMemo } from 'react';
import TournamentActionsMenu from '../../components/ActionsMenu/ActionsMenu';
import TournamentHeader from '../../components/Header/Header';
import PlayoffTab from '../../components/PlayoffTab/PlayoffTab';
import TournamentTabs from '../../components/Tabs/Tabs';
import TourTab from '../../components/TourTab/TourTab';
import { useCanManageTournament } from '../../hooks';
import useResetTabsState from '../../hooks/useResetTabsState';
import { tournamentActiveTabAtom } from '../../states/active-tab.state';

interface IProps {
  tournament: ITournament;
}

function TournamentWithTours(props: IProps) {
  const tournament = props.tournament;

  const [activeTab, setActiveTab] = useAtom(tournamentActiveTabAtom);

  const canManageTournament = useCanManageTournament(tournament);

  const actionsMenu = useMemo(() => {
    if (!canManageTournament) {
      return null;
    }

    return (
      <TournamentActionsMenu
        tournament={tournament}
        showAddTourItem
        showAddPersonItem
        showAttachPlayoffItem
        showFinishTournament
      />
    );
  }, [canManageTournament, tournament]);

  useResetTabsState(tournament);

  return (
    <>
      <TournamentHeader tournament={tournament} actions={actionsMenu} />

      <Tabs.Root value={activeTab} onValueChange={(value) => setActiveTab(value)}>
        <TournamentTabs tournamentId={tournament.id} tours={tournament.tours} />

        <Box pt={'3'}>
          {tournament.tours
            .filter((tour) => !tour.playOffStage)
            .map((tour, index) => (
              <Tabs.Content key={`tour-${tour.id}`} value={`${index}`}>
                <TourTab tour={tour} />
              </Tabs.Content>
            ))}

          <Tabs.Content value={'-1'}>
            <PlayoffTab tournament={tournament} />
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </>
  );
}

export default TournamentWithTours;
