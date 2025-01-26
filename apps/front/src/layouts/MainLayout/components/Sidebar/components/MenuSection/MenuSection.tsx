import { Flex } from '@radix-ui/themes';
import React from 'react';
import { useUserPermissions } from '../../../../../../shared/hooks';
import { IMenuSection, TMenuItem } from '../../Sidebar.types';
import MenuItem from '../MenuItem/MenuItem';

function MenuSection(props: IMenuSection) {
  const permissions = useUserPermissions();

  const skipIfNoPermissions = (menuItem: TMenuItem): boolean => {
    if (!menuItem.permissions?.length) {
      return false;
    }

    return !permissions.has(menuItem.permissions);
  };

  return (
    <Flex direction={'column'} mt={'2'} gap={'1'}>
      {props.items.map((menuItem) => {
        if (skipIfNoPermissions(menuItem)) {
          return null;
        }

        if (menuItem.type === 'link') {
          return <MenuItem key={menuItem.title} {...menuItem} />;
        }

        return <React.Fragment key={Math.random()}>{menuItem.component}</React.Fragment>;
      })}
    </Flex>
  );
}

export default MenuSection;
