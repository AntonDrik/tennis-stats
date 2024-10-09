import { Button, Dialog, Flex } from '@radix-ui/themes';
import * as React from 'react';
import { DialogCloseButton } from '../core';
import { IConfirmProps } from './ConfirmModal.tyles';

function ConfirmModal(props: IConfirmProps) {
  return (
    <Dialog.Content>
      <DialogCloseButton />

      <Dialog.Title>{props.title}</Dialog.Title>

      <Dialog.Description>{props.description}</Dialog.Description>

      <Flex gap={'4'} mt={'4'} align={'center'} justify={'end'}>
        <Button onClick={props.denyButton.onClick} {...props.denyButton.props}>
          {props.denyButton.caption}
        </Button>

        <Button onClick={props.confirmButton.onClick} {...props.confirmButton.props}>
          {props.confirmButton.caption}
        </Button>
      </Flex>
    </Dialog.Content>
  );
}

export default ConfirmModal;
