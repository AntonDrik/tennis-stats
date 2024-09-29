import { Tab, Tabs } from '@mui/material';
import Stack from '@mui/material/Stack';
import styled from 'styled-components';

const AntTabs = styled(Tabs)({
  borderBottom: '1px solid #e8e8e8',

  '& .MuiTabs-indicator': {
    backgroundColor: '#1890ff',
  },
});

const AntTab = styled(Tab)({
  '&.Mui-selected': {
    color: 'white',
    backgroundColor: '#C2E5FF',
  },
});

const Card = styled(Stack)`
  border-radius: 12px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(141, 176, 172, 0.3);
  overflow: hidden;
`;

export default {
  AntTabs,
  AntTab,
  Card,
};
