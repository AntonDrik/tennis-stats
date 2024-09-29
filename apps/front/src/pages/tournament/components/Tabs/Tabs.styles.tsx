import { Tab, Tabs as MuiTabs, tabClasses, tabsClasses } from '@mui/material';
import styled from 'styled-components';
import theme from '../../../../theme/theme';

const Tabs = styled(MuiTabs)({
  width: '100%',
  boxShadow: 'inset 0 -1px 0 0 #E6ECF0',

  [`& .${tabsClasses.indicator}`]: {
    backgroundColor: '#1da1f2',
  },
});

const TabItem = styled(Tab)(() => ({
  minHeight: 53,
  minWidth: 80,
  textTransform: 'none',
  fontSize: 15,
  fontWeight: 700,
  color: '#797979',
  opacity: 1,
  marginRight: 6,

  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',

  '&:hover': {
    backgroundColor: 'rgba(29, 161, 242, 0.1)',
    color: '#1da1f2',
  },
  [theme.breakpoints.up('md')]: {
    minWidth: 120,
  },
  [`&.${tabClasses.selected}`]: {
    color: '#1da1f2',
    backgroundColor: 'rgba(67,168,213,0.24)',
  },
}));

const PlayOffTabItem = styled(TabItem)({
  color: '#797979',
  backgroundColor: 'rgba(164,67,213,0.24)',
  minWidth: 60,

  '&:hover': {
    backgroundColor: 'rgba(164,67,213,0.2)',
    color: 'rgba(106,27,180,0.73)',
  },

  [`&.${tabClasses.selected}`]: {
    color: 'rgba(106,27,180,0.73)',
    backgroundColor: 'rgba(164,67,213,0.24)',
  },
});

export default {
  Tabs,
  TabItem,
  PlayOffTabItem,
};
