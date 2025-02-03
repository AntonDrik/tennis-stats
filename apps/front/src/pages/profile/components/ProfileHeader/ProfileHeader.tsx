import { Badge, Box, Flex, Heading, Strong } from '@radix-ui/themes';
import { IUser } from '@tennis-stats/types';

import RatingStarSvg from '../../../../shared/svg-icons/rating-star.svg';

interface IProps {
  user: IUser;
}

function ProfileHeader(props: IProps): JSX.Element {
  return (
    <Flex align={'center'} justify={'center'} gap={'3'}>
      <Heading align={'center'} mb={'2'}>
        {props.user.nickname}
      </Heading>

      <Flex align={'center'} gap={'1'}>
        <Badge size={'2'} color={'grass'}>
          <Box width={'20px'} height={'20px'} ml={'-1'}>
            <RatingStarSvg />
          </Box>
          <Strong style={{ marginTop: '2px' }}>{props.user.rating}</Strong>
        </Badge>
      </Flex>
    </Flex>
  );
}

export default ProfileHeader;
