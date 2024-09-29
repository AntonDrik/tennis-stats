import { useAtom } from 'jotai';
import * as React from 'react';
import { SyntheticEvent } from 'react';
import TabContent from '../../shared/components/TabContent/TabContent';

import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';

import Styled from './AuthPage.styles';
import { authPageSelectedTabAtom } from './state/AuthPage.state';

function AuthPage() {
  const [selectedTab, setSelectedTab] = useAtom(authPageSelectedTabAtom);

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Styled.Card>
      <Styled.AntTabs
        value={selectedTab}
        onChange={handleTabChange}
        aria-label="basic tabs example"
      >
        <Styled.AntTab label="Авторизация" />
        <Styled.AntTab label="Регистрация" />
      </Styled.AntTabs>

      <TabContent value={selectedTab} index={0}>
        <Login />
      </TabContent>

      <TabContent value={selectedTab} index={1}>
        <Registration />
      </TabContent>
    </Styled.Card>
  );
}

export default AuthPage;
