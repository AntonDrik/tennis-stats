import { Select } from '@radix-ui/themes';

interface IProps {
  onChange: (value: string) => void;
}

function YearSelect(props: IProps) {
  return (
    <Select.Root defaultValue="2025" onValueChange={props.onChange}>
      <Select.Trigger />
      <Select.Content>
        <Select.Item value="2024">2024</Select.Item>
        <Select.Item value="2025">2025</Select.Item>
      </Select.Content>
    </Select.Root>
  );
}

export default YearSelect;
