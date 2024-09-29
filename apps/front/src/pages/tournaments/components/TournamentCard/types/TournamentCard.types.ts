import { ITournament } from '@tennis-stats/types';

type TPropsWithData = {
  type: 'data';
  tournament: ITournament;
  onClick?: () => void;
};

type TEmptyProps = {
  type: 'add-new';
  onClick?: () => void;
};

type TProps = TEmptyProps | TPropsWithData;

export { TEmptyProps, TPropsWithData, TProps };
