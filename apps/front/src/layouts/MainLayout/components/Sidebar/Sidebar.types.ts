import { EPermission } from '@tennis-stats/types';
import { ReactElement } from 'react';

export type IMenuLinkItem = {
  type: 'link';
  title: string;
  link: string;
  icon: ReactElement;
  permissions?: EPermission[];
};

export type IMenuComponentItem = {
  type: 'component';
  component: ReactElement;
  permissions?: EPermission[];
};

export type TMenuItem = IMenuLinkItem | IMenuComponentItem;

export interface IMenuSection {
  items: TMenuItem[];
}
