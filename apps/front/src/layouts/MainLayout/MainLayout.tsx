import { Box, Container, Flex } from '@radix-ui/themes';
import { useAtomValue, useSetAtom } from 'jotai';
import { ReactElement, useEffect } from 'react';
import useMediaQuery from '../../shared/hooks/useMediaQuery';

import Sidebar from './components/Sidebar/Sidebar';
import TopBar from './components/TopBar/TopBar';
import { updateMainLayoutAtom } from './MainLayout.state';

interface IProps {
  children: ReactElement;
}

function MainLayout(props: IProps) {
  const updateMainLayoutState = useSetAtom(updateMainLayoutAtom);

  const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)');

  useEffect(() => {
    updateMainLayoutState({
      isHiddenMenu: isSmallDevice,
      isOpenedMenu: false,
    });
  }, [isSmallDevice]);

  return (
    <Box>
      {/*<Styled.Gradient />*/}

      <TopBar />

      <Flex>
        <Sidebar />

        <Container
          size={'4'}
          style={{
            flexShrink: 'unset',
            width: 'calc(100% - 250px)',
            marginLeft: !isSmallDevice ? 250 : 0,
          }}
        >
          {props.children}
        </Container>
      </Flex>
    </Box>
  );
}

export default MainLayout;
