import { useSetAtom, useAtomValue } from 'jotai';
import React, { useEffect, useMemo } from 'react';
import { appRoutes } from '../../../../routes/routes.constant';
import { DashboardIcon, PersonIcon, SettingsIcon } from '../../../../shared/svg-icons';
import { mainLayoutAtom, updateMainLayoutAtom } from '../../MainLayout.state';

import { MenuSection } from './components';
import Styled from './Sidebar.styles';
import { IMenuSection } from './Sidebar.types';
import { Box } from '@radix-ui/themes';

function SideBar() {
  const mainLayoutState = useAtomValue(mainLayoutAtom);
  const updateMainLayoutState = useSetAtom(updateMainLayoutAtom);

  const menuList: IMenuSection[] = useMemo(
    () => [
      {
        items: [
          {
            type: 'link',
            title: 'Турниры',
            link: appRoutes.TOURNAMENTS,
            icon: <DashboardIcon fill={'var(--sage-12)'} />,
          },
          {
            type: 'link',
            title: 'Пользователи',
            link: appRoutes.USERS,
            icon: <PersonIcon fill={'var(--sage-12)'} />,
          },
          {
            type: 'link',
            title: 'Настройки',
            link: appRoutes.SETTINGS,
            icon: <SettingsIcon fill={'var(--sage-12)'} />,
            adminOnly: true,
          },
        ],
      },
    ],
    []
  );

  useEffect(() => {
    if (!mainLayoutState.isHiddenMenu) {
      return;
    }

    document.body.style.overflow = mainLayoutState.isOpenedMenu ? 'hidden' : 'auto';
  }, [mainLayoutState]);

  if (mainLayoutState.isHiddenMenu) {
    return (
      <Box>
        <Styled.Backdrop
          $isOpen={mainLayoutState.isOpenedMenu}
          onClick={() => updateMainLayoutState({ isOpenedMenu: false })}
        />

        <Styled.FixedMenuWrapper $isOpen={mainLayoutState.isOpenedMenu}>
          {menuList.map((section) => (
            <MenuSection key={Math.random()} items={section.items} />
          ))}
        </Styled.FixedMenuWrapper>
      </Box>
    );
  }

  return (
    <Styled.VisibleMenuWrapper>
      {menuList.map((section) => (
        <MenuSection key={Math.random()} items={section.items} />
      ))}
    </Styled.VisibleMenuWrapper>
  );
}

export default SideBar;
