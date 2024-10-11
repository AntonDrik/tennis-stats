import { Dialog } from '@radix-ui/themes';
import { useAtomValue } from 'jotai';
import * as React from 'react';
import { tournamentAtom } from '../../../../../../core/store';
import { IGameSet } from '@tennis-stats/types';

interface IProps {
  title?: (gameSet: IGameSet | null) => string;
}

function ModalHeader(props: IProps) {
  const tourPageState = useAtomValue(tournamentAtom);

  const gameSet = tourPageState.selectedGameSet;

  const title = props.title ? props.title(gameSet) : `Сет № ${gameSet?.number}`;

  return <Dialog.Title align={'center'}>{title}</Dialog.Title>;
}

export default ModalHeader;
