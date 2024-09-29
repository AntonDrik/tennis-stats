import { SxProps } from '@mui/material';
import Stack from '@mui/material/Stack';
import { Variant } from '@mui/material/styles/createTypography';
import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';

interface IProps {
  title: string;
  titleVariant?: Variant;
  icon?: ReactElement;
  titleContainerSx?: SxProps;
  containerSx?: SxProps;
  children: ReactElement | ReactElement[];
}

function InfoSection(props: IProps) {
  return (
    <Stack sx={props.containerSx}>
      <Stack direction={'row'} spacing={1} sx={props.titleContainerSx}>
        {props.icon}
        <Typography variant={props.titleVariant ?? 'h4'}>
          {props.title}
        </Typography>
      </Stack>

      {props.children}
    </Stack>
  );
}

export default InfoSection;
