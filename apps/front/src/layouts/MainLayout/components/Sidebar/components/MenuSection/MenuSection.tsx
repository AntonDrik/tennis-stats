import { Flex } from '@radix-ui/themes';
import React from 'react';
import { IMenuSection } from '../../Sidebar.types';
import MenuItem from '../MenuItem/MenuItem';

function MenuSection(props: IMenuSection) {
  return (
    <Flex direction={'column'} mt={'2'} gap={'1'}>
      {props.items.map((menuItem) => {
        if (menuItem.type === 'link') {
          return <MenuItem key={menuItem.title} {...menuItem} />;
        }

        return <React.Fragment key={Math.random()}>{menuItem.component}</React.Fragment>;
      })}
    </Flex>
  );
}

export default MenuSection;
