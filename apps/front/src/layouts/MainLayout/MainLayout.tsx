import { Box, Container } from '@mui/material';
import { ReactElement } from 'react';

import Sidebar from './components/Sidebar/Sidebar';
import TopBar from './components/TopBar/TopBar';
import Styled from './MainLayout.styles';

interface IProps {
  children: ReactElement;
}

function MainLayout({ children }: IProps) {
  return (
    <Box display={'flex'}>
      <TopBar />

      <Sidebar />

      <Container maxWidth={'lg'} sx={{ px: '0px!important' }}>
        <Styled.Content>{children}</Styled.Content>
      </Container>
    </Box>
  );
}

export default MainLayout;
