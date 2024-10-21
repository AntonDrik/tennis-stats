// import { DropdownMenu, IconButton } from '@radix-ui/themes';
// import { ITour } from '@tennis-stats/types';
// import { useAtomValue, useSetAtom } from 'jotai';
// import React from 'react';
// import { toast } from 'react-hot-toast';
// import { useRemoveTourMutation } from '../../../../../../core/api';
// import { tournamentAtom } from '../../../../../../core/store';
// import { useConfirmModal } from '../../../../../../shared/components';
// import {
//   CheckCircleIcon,
//   TrashIcon,
//   VerticalDotsIcon,
// } from '../../../../../../shared/svg-icons';
// import { tabsAtom } from '../../../../states/Tabs.state';
//
// interface IProps {
//   tour: ITour;
// }
//
// function TourActionsMenu(props: IProps) {
//   const tournamentState = useAtomValue(tournamentAtom);
//   const setTabsState = useSetAtom(tabsAtom);
//
//   const removeTourMutation = useRemoveTourMutation(tournamentState);
//
//   const removeTourConfirmModal = useConfirmModal({
//     title: `Вы действительно хотите удалить тур № ${props.tour.number}?`,
//     description: 'Таблица лидеров будет перестроена',
//     confirmTitle: 'Да, удалить',
//     denyTitle: 'Нет, отменить',
//   });
//
//   const removeTour = () => {
//     removeTourConfirmModal(() => {
//       removeTourMutation.mutateAsync().then(() => {
//         toast.success(`Тур № ${props.tour.number} удален`);
//         setTabsState('0');
//       });
//     });
//   };
//
//   return (
//     <DropdownMenu.Root>
//       <DropdownMenu.Trigger>
//         <IconButton variant={'ghost'} size={'1'} radius={'full'}>
//           <VerticalDotsIcon />
//         </IconButton>
//       </DropdownMenu.Trigger>
//
//       <DropdownMenu.Content align={'center'}>
//         <DropdownMenu.Item color={'red'} onClick={removeTour}>
//           <TrashIcon />
//           Удалить тур
//         </DropdownMenu.Item>
//       </DropdownMenu.Content>
//     </DropdownMenu.Root>
//   );
// }
//
// export default TourActionsMenu;
