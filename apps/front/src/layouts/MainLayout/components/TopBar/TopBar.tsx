import { Flex, IconButton } from '@radix-ui/themes';
import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback, useEffect } from 'react';
import { BurgerIcon, CloseIcon } from '../../../../shared/svg-icons';
import { Logo } from '../../../../shared/svg-icons';
import { mainLayoutAtom, updateMainLayoutAtom } from '../../MainLayout.state';
import AvatarAndMenu from './components/AvatarAndMenu/AvatarAndMenu';
import BackButton from './components/BackButton/BackButton';
import Styled from './TopBar.styles';

function TopBar() {
  const mainLayoutState = useAtomValue(mainLayoutAtom);
  const updateMainLayoutState = useSetAtom(updateMainLayoutAtom);

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

  const handleScroll = () => {
    updateMainLayoutState({ isFixedTop: Boolean(window.scrollY) });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Styled.Wrapper $isFixed={mainLayoutState.isFixedTop}>
      <Flex gap={'2'} align={'center'}>
        {mainLayoutState.isHiddenMenu && (
          <IconButton variant="soft" size={'3'} onClick={handleClick}>
            {getIcon()}
          </IconButton>
        )}

        {!mainLayoutState.isHiddenMenu && <Logo fill={'var(--blue-12)'} />}
      </Flex>

      <Flex direction={'row'} gap={'5'}>
        <BackButton />

        <AvatarAndMenu />
      </Flex>
    </Styled.Wrapper>
  );
}

export default TopBar;
