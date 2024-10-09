import { Flex, Text } from '@radix-ui/themes';
import { ITournament } from '@tennis-stats/types';

import {
  SecondPlaceIcon,
  ThirdPlaceIcon,
  WinnerIcon,
} from '../../../../../../shared/svg-icons';

interface IProps {
  tournament: ITournament;
}

function MiniLeaderboard(props: IProps) {
  return (
    <Flex direction={'column'} align={'start'} height={'calc(100% - 50px)'}>
      <Flex direction={'column'} gap={'4'}>
        {props.tournament.leaderboard
          .sort((a, b) => a.place - b.place)
          .map((item, index) => (
            <Flex gap={'2'} align={'center'} key={`mini-leaderboard-${index}`}>
              <Flex width={'35px'} height={'35px'}>
                {item.place === 1 && <WinnerIcon width={'100%'} />}
                {item.place === 2 && <SecondPlaceIcon width={'100%'} />}
                {item.place === 3 && <ThirdPlaceIcon width={'100%'} />}
              </Flex>

              <Text weight={'bold'}>{item.user.nickname}</Text>
            </Flex>
          ))}
      </Flex>
    </Flex>
  );
}

export default MiniLeaderboard;
