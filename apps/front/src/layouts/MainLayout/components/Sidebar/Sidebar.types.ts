import { ReactElement } from 'react';

export type IMenuLinkItem = {
  type: 'link';
  title: string;
  link: string;
  icon: ReactElement;
  adminOnly?: boolean;
};

export type IMenuComponentItem = {
  type: 'component';
  component: ReactElement;
  adminOnly?: boolean;
};

export type TMenuItem = IMenuLinkItem | IMenuComponentItem;

export interface IMenuSection {
  items: TMenuItem[];
}
