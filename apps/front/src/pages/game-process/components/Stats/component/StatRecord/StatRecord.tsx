import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { VerticalNumberInput } from '../../../../../../shared/components';

interface IProps {
  name: string;
  value: number;
  onChange: (newValue: number) => void;
}

function StatRecord(props: IProps) {

  const [value, setValue] = useState(props.value);

  const handleChange = (newValue: number) => {
    setValue(newValue);
    props.onChange(newValue);
  };

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <Stack p={'4px'} sx={{ backgroundColor: '#EEF1F0', borderRadius: 2, width: '100%' }}>
      <Typography textAlign={'center'} mb={0.5} lineHeight={1}>{props.name}</Typography>

      <VerticalNumberInput
        value={value}
        renderInput={() => <Box>{value}</Box>}
        wrapperSx={{
          flexDirection: 'row-reverse',
          justifyContent: 'space-evenly'
        }}
        buttonStyle={{
          width: 20,
          height: 20,
          borderRadius: 4
        }}
        min={0}
        onChange={handleChange}
      />
    </Stack>

  );

}

export default StatRecord;
