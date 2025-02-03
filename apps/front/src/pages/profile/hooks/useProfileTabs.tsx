import { IUser } from '@tennis-stats/types';
import { useAtomValue } from 'jotai/index';
import { ReactElement, useMemo } from 'react';
import { meAtom } from '../../../core/store';
import { useUserPermissions } from '../../../shared/hooks';
import AdminSettings from '../components/AdminSettings/AdminSettings';
import UserSettings from '../components/UserSettings/UserSettings';
import UserStats from '../components/UserStats/UserStats';

interface ITab {
  title: string;
  order: number;
  component: ReactElement;
}

function useProfileTabs(user: IUser | undefined) {
  const me = useAtomValue(meAtom);
  const permissions = useUserPermissions();

  const isMyProfile = me.id === user?.id;

  return useMemo(() => {
    if (!user) {
      return [];
    }

    const commonTabs: ITab[] = [
      { title: 'Статистика', order: 1, component: <UserStats user={user} /> },
    ];

    const userTabs: ITab[] = [
      { title: 'Настройки', order: 2, component: <UserSettings user={user} /> },
    ];

    const adminTabs: ITab[] = [
      { title: 'Управление', order: 3, component: <AdminSettings user={user} /> },
    ];

    return [
      ...commonTabs,
      ...(isMyProfile ? userTabs : []),
      ...(!isMyProfile && permissions.canCrudUser ? adminTabs : []),
    ].sort((a, b) => a.order - b.order);
  }, [permissions.canCrudUser, isMyProfile, user]);
}

export default useProfileTabs;
