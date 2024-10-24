import { Box, Dialog, Flex, ScrollArea, Tabs } from '@radix-ui/themes';
import React from 'react';
import { useGetLeaderboardQuery } from '../../../../core/api';
import { Spinner } from '../../../../shared/components';
import { DialogCloseButton } from '../../../../shared/components/Modals';
import { Leaderboard } from '../../../../shared/components/Tournament';

interface IProps {
  tournamentId: number;
}

function LeaderboardModal(props: IProps) {
  const leaderboard = useGetLeaderboardQuery(props.tournamentId);

  const hasPlayoffLeaderborad = (leaderboard.data?.playoffLeaderboard.length ?? 0) > 0;

  return (
    <Dialog.Content>
      <DialogCloseButton />

      {leaderboard.isLoading && <Spinner />}
      <Dialog.Title align={'center'}>Таблица лидеров</Dialog.Title>

      <Tabs.Root defaultValue="tours">
        <Tabs.List>
          <Tabs.Trigger value="tours">Туры</Tabs.Trigger>
          <Tabs.Trigger value="playoff" disabled={!hasPlayoffLeaderborad}>
            Плей-офф
          </Tabs.Trigger>
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
