import { Box, Dialog, Flex, ScrollArea } from '@radix-ui/themes';
import React from 'react';
import { useGetLeaderboardQuery } from '../../../../core/api';
import { Leaderboard } from '../../../../shared/components/Tournament';

interface IProps {
  tournamentId: number;
}

function LeaderboardModal(props: IProps) {
  const leaderboard = useGetLeaderboardQuery(props.tournamentId);

  return (
    <Dialog.Content>
      <Dialog.Title align={'center'}>Таблица лидеров</Dialog.Title>

      <Flex mr={'-3'}>
        <ScrollArea scrollbars="vertical" style={{ height: 'calc(100vh - 200px)' }}>
          <Box pr={'3'}>
            {leaderboard.data && <Leaderboard leaderboardItems={leaderboard.data} />}
          </Box>
        </ScrollArea>
      </Flex>
    </Dialog.Content>
  );
}

export default LeaderboardModal;
