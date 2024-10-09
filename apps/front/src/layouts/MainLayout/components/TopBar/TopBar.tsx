import { Flex, IconButton } from '@radix-ui/themes';
import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback } from 'react';
import useMediaQuery from '../../../../shared/hooks/useMediaQuery';
import { BurgerIcon, CloseIcon } from '../../../../shared/svg-icons';
import { Logo } from '../../../../shared/svg-icons';
import { mainLayoutAtom, updateMainLayoutAtom } from '../../MainLayout.state';
import AvatarAndMenu from './components/AvatarAndMenu/AvatarAndMenu';
import BackButton from './components/BackButton/BackButton';
import Styled from './TopBar.styles';

function TopBar() {
  const mainLayoutState = useAtomValue(mainLayoutAtom);
  const updateMainLayoutState = useSetAtom(updateMainLayoutAtom);

  const isMobileDevice = useMediaQuery('only screen and (max-width : 576px)');

  const getIcon = useCallback(() => {
    if (mainLayoutState.isOpenedMenu) {
      return <CloseIcon fill={'var(--sage-12)'} />;
    }

    return <BurgerIcon fill={'var(--sage-12)'} />;
  }, [mainLayoutState.isOpenedMenu]);

  const handleClick = () => {
    if (mainLayoutState.isOpenedMenu) {
      updateMainLayoutState({ isOpenedMenu: false });

      return;
    }

    updateMainLayoutState({ isOpenedMenu: true });
  };

  return (
    <Styled.Wrapper>
      <Flex gap={'2'} align={'center'}>
        {mainLayoutState.isHiddenMenu && (
          <IconButton variant="soft" size={'3'} onClick={handleClick}>
            {getIcon()}
          </IconButton>
        )}

        {!mainLayoutState.isHiddenMenu && <Logo fill={'var(--blue-12)'} />}
      </Flex>

      <Flex direction={'row'} gap={'5'}>
        {!isMobileDevice && <BackButton />}

        <AvatarAndMenu />
      </Flex>
    </Styled.Wrapper>
  );
}

export default TopBar;
