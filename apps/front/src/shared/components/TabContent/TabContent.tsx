import { Box, SxProps } from '@mui/material';
import { ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
  index: number;
  value: number;
  sxProps?: SxProps;
}

function TabContent(props: IProps) {
  const { children, value, index } = props;

  if (value !== index) {
    return null;
  }

  return <Box sx={{ p: 3, ...props.sxProps }}>{children}</Box>;
}

export default TabContent;
