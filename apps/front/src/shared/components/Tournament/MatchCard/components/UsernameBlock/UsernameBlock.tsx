import { Flex } from '@radix-ui/themes';
import { IUser } from '@tennis-stats/types';
import React, { memo } from 'react';
import Styled from '../../MatchCard.styles';

interface IProps {
  user1: IUser | null;
  user2: IUser | null;
  isPlayoffCard: boolean | undefined;
}

function MatchUsernameBlock(props: IProps) {
  return (
    <Flex direction={'column'} style={{ flex: 1 }}>
      <Styled.Username mb={'2'} weight={'medium'}>
        {props.user1?.nickname ?? 'Не определено'}
      </Styled.Username>

      <Styled.Divider $isPlayoffCard={props.isPlayoffCard} />

      <Styled.Username mt={'2'} weight={'medium'}>
        {props.user2?.nickname ?? 'Не определено'}
      </Styled.Username>
    </Flex>
  );
}

export default memo(MatchUsernameBlock);
