import { Box, Dialog, Flex, ScrollArea, Tabs } from '@radix-ui/themes';
import { useAtom } from 'jotai';
import React from 'react';
import { useGetLeaderboardQuery } from '../../../../core/api';
import { Spinner } from '../../../../shared/components';
import { DialogCloseButton } from '../../../../shared/components/Modals';
import { Leaderboard } from '../../../../shared/components/Tournament';
import { leaderboardTabAtom } from './LeaderboardModal.state';

interface IProps {
  tournamentId: number;
}

function LeaderboardModal(props: IProps) {
  const [activeTab, setActiveTab] = useAtom(leaderboardTabAtom);

  const leaderboard = useGetLeaderboardQuery(props.tournamentId);

  const hasToursLeaderboard = (leaderboard.data?.toursLeaderboard.length ?? 0) > 0;
  const hasPlayoffLeaderborad = (leaderboard.data?.playoffLeaderboard.length ?? 0) > 0;

  return (
    <Dialog.Content>
      <DialogCloseButton />

      {leaderboard.isLoading && <Spinner />}
      <Dialog.Title align={'center'}>Таблица лидеров</Dialog.Title>

      <Tabs.Root value={activeTab} onValueChange={(value) => setActiveTab(value)}>
        <Tabs.List>
          {hasToursLeaderboard && <Tabs.Trigger value="tours">Туры</Tabs.Trigger>}

          {hasPlayoffLeaderborad && <Tabs.Trigger value="playoff">Плей-офф</Tabs.Trigger>}
        </Tabs.List>

        <Box pt="3">
          <Tabs.Content value="tours">
            <Flex mr={'-3'}>
              <ScrollArea
                scrollbars="vertical"
                style={{ maxHeight: 'calc(100vh - 200px)' }}
              >
                <Box pr={'3'}>
                  {leaderboard.data && (
                    <Leaderboard leaderboardItems={leaderboard.data.toursLeaderboard} />
                  )}
                </Box>
              </ScrollArea>
            </Flex>
          </Tabs.Content>

          <Tabs.Content value="playoff">
            <Flex mr={'-3'}>
              <ScrollArea
                scrollbars="vertical"
                style={{ maxHeight: 'calc(100vh - 200px)' }}
              >
                <Box pr={'3'}>
                  {leaderboard.data && (
                    <Leaderboard leaderboardItems={leaderboard.data.playoffLeaderboard} />
                  )}
                </Box>
              </ScrollArea>
            </Flex>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Dialog.Content>
  );
}

export default LeaderboardModal;
