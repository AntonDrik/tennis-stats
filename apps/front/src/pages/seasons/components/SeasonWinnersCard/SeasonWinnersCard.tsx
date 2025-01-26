import { Callout, DataList, Flex, Heading } from '@radix-ui/themes';
import { ISeasonWithStats } from '@tennis-stats/types';
import React from 'react';

interface IProps {
  season: ISeasonWithStats;
}

function SeasonWinnersCard(props: IProps) {
  return (
    <Callout.Root size={'1'} color={'grass'} variant={'soft'}>
      <Flex direction={'column'} gap={'2'}>
        <Heading size={'2'}>Победители финальной игры сезона</Heading>

        <DataList.Root className={'DataListRoot'} size={'2'}>
          {props.season.leaderboard.map((leaderboard) => (
            <DataList.Item key={`data-list-item__${leaderboard.user.id}`} align="center">
              <DataList.Label minWidth="80px">{leaderboard.place} место</DataList.Label>
              <DataList.Value>{leaderboard.user.nickname}</DataList.Value>
            </DataList.Item>
          ))}
        </DataList.Root>
      </Flex>
    </Callout.Root>
  );
}

export default SeasonWinnersCard;
