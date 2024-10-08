import { Flex, IconButton, Tabs } from '@radix-ui/themes';
import { ITour } from '@tennis-stats/types';
import { useAtom, useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { useRemovePlayoffMutation, useRemoveTourMutation } from '../../../../core/api';
import { tournamentAtom } from '../../../../core/store';
import { useConfirmModal } from '../../../../shared/components';
import { CloseIcon } from '../../../../shared/svg-icons';
import { useCanManageTournament } from '../../hooks';
import { tabsAtom } from '../../states/Tabs.state';

import Styled from './Tabs.styles';

interface IProps {
  tours: ITour[];
}

function TournamentTabs(props: IProps) {
  const [tabsState, setTabsState] = useAtom(tabsAtom);
  const tournamentState = useAtomValue(tournamentAtom);

  const removePlayoffMutation = useRemovePlayoffMutation();
  const removeTourMutation = useRemoveTourMutation(tournamentState);

  const canManageTournament = useCanManageTournament();

  const removeTourConfirmModal = useConfirmModal({
    title: 'Вы действительно хотите удалить тур?',
    confirmTitle: 'Да, удалить',
    denyTitle: 'Нет, отменить',
  });

  const removePlayoffConfirmModal = useConfirmModal({
    title: 'Вы действительно хотите удалить плейофф?',
    confirmTitle: 'Да, удалить',
    denyTitle: 'Нет, отменить',
  });

  const hasPlayoffMatches = useMemo(() => {
    return props.tours.some((tour) => tour.playOffStage);
  }, [props.tours]);

  const removeTour = (tour: ITour) => {
    removeTourConfirmModal(
      () => {
        removeTourMutation.mutateAsync().then(() => {
          toast.success('Турнир успешно удален');
          setTabsState('0');
        });
      },
      { title: `Вы действительно хотите удалить тур № ${tour.number}?` }
    );
  };

  const removePlayoff = () => {
    removePlayoffConfirmModal(() => {
      removePlayoffMutation.mutateAsync().then(() => {
        toast.success('Плейофф успешно удален');
        setTabsState('0');
      });
    });
  };

  return (
    <Tabs.List>
      {props.tours
        .filter((tour) => !tour.playOffStage)
        .map((tour, index) => (
          <Tabs.Trigger key={`tour-tab-${tour.id}`} value={index.toString()}>
            {`Тур № ${tour.number}`}

            {tabsState === index.toString() && canManageTournament && (
              <Flex ml={'2'} align={'center'}>
                <IconButton
                  variant={'ghost'}
                  size={'1'}
                  radius={'full'}
                  color={'red'}
                  onClick={() => removeTour(tour)}
                >
                  <CloseIcon />
                </IconButton>
              </Flex>
            )}
          </Tabs.Trigger>
        ))}

      {hasPlayoffMatches && (
        <Styled.PlayoffTab value={'-1'}>
          Плейофф
          {tabsState === '-1' && canManageTournament && (
            <Flex ml={'2'} align={'center'}>
              <IconButton
                variant={'ghost'}
                size={'1'}
                radius={'full'}
                color={'red'}
                onClick={() => removePlayoff()}
              >
                <CloseIcon />
              </IconButton>
            </Flex>
          )}
        </Styled.PlayoffTab>
      )}
    </Tabs.List>
  );
}

export default TournamentTabs;
