import React, { useState } from 'react';
import { Box, Tabs, Text } from '@radix-ui/themes';
import { Navigate, useParams } from 'react-router-dom';
import { useGetUserQuery } from '../../core/api';
import { appRoutes } from '../../routes/routes.constant';
import { Page, Spinner } from '../../shared/components';
import ProfileHeader from './components/ProfileHeader/ProfileHeader';
import useProfileTabs from './hooks/useProfileTabs';

import './styles.scss';

type IRouteParams = {
  id: string;
};

function ProfilePage() {
  const params = useParams<IRouteParams>();

  const user = useGetUserQuery(params?.id);
  const tabsList = useProfileTabs(user.data);

  const [activeTab, setActiveTab] = useState<string>('Статистика');

  if (user.isLoading) {
    return <Spinner page />;
  }

  if (!user.data) {
    return <Navigate to={appRoutes.TOURNAMENTS} />;
  }

  return (
    <Page title={`Профиль | ${user.data.nickname}`}>
      <ProfileHeader user={user.data} />

      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <Tabs.List>
          {tabsList.map((tab) => (
            <Tabs.Trigger
              key={`profile-tab-trigger-${tab.title}`}
              className={'tab-trigger'}
              value={tab.title}
              data-triggers-count={tabsList.length}
            >
              <Text>{tab.title}</Text>
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <Box pt={'4'}>
          {tabsList.map((tab) => (
            <Tabs.Content key={`profile-tab-content-${tab.title}`} value={tab.title}>
              {tab.component}
            </Tabs.Content>
          ))}
        </Box>
      </Tabs.Root>
    </Page>
  );
}

export default ProfilePage;
