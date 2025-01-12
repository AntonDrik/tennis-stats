import { Flex, SegmentedControl, Text } from '@radix-ui/themes';
import React from 'react';

type TElement = React.ElementRef<typeof SegmentedControl.Root>;

interface IProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
}

const PlayoffToggle = React.forwardRef<TElement, IProps>((props, forwardedRef) => {
  return (
    <Flex direction={'column'} gap={'1'}>
      {props.label && (
        <Text size="2" weight={'medium'}>
          {props.label}
        </Text>
      )}

      <SegmentedControl.Root
        ref={forwardedRef}
        size={'3'}
        value={props.value}
        onValueChange={props.onChange}
      >
        <SegmentedControl.Item value="1/8">
          <Text>1/8 </Text>

          <Text size={'1'} weight={'light'} style={{ lineHeight: '2px' }}>
            (мин. 16 игроков)
          </Text>
        </SegmentedControl.Item>

        <SegmentedControl.Item value="1/4">
          <Text>1/4 </Text>
          <Text size={'1'} weight={'light'}>
            (мин. 8 игроков)
          </Text>
        </SegmentedControl.Item>
      </SegmentedControl.Root>
    </Flex>
  );
});

export default PlayoffToggle;
