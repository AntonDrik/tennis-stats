import { Box, Card, Tabs } from '@radix-ui/themes';
import { useAtom } from 'jotai';
import * as React from 'react';
import { useMediaQuery } from '../../shared/hooks';

import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';

import { authPageSelectedTabAtom, TAuthTab } from './state/AuthPage.state';

function AuthPage() {
  const [selectedTab, setSelectedTab] = useAtom(authPageSelectedTabAtom);

  const isSmallDevice = useMediaQuery('only screen and (max-width : 475px)');

  const handleTabChange = (newValue: string) => {
    setSelectedTab(newValue as TAuthTab);
  };

  return (
    <Card size={'4'} style={{ width: isSmallDevice ? '100%' : '350px' }}>
      <Tabs.Root value={selectedTab} onValueChange={handleTabChange}>
        <Tabs.List>
          <Tabs.Trigger value="login">Авторизация</Tabs.Trigger>
          <Tabs.Trigger value="registration">Регистрация</Tabs.Trigger>
        </Tabs.List>

        <Box pt="4">
          <Tabs.Content value="login">
            <Login />
          </Tabs.Content>

          <Tabs.Content value="registration">
            <Registration />
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Card>
  );
}

export default AuthPage;
