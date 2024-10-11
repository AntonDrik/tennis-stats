import { Flex, IconButton, Text } from '@radix-ui/themes';
import React from 'react';
import { Toast, toast, ToastBar, Toaster as HotToaster } from 'react-hot-toast';
import { CloseIcon } from '../../svg-icons';

function Toaster() {
  const getTextColor = (t: Toast) => {
    if (t.type === 'success') {
      return 'green';
    }

    if (t.type === 'error') {
      return 'red';
    }

    return 'gray';
  };

  return (
    <HotToaster
      position={'bottom-center'}
      toastOptions={{
        duration: 5000,
        style: {
          borderRadius: 'var(--radius-4)',
          maxWidth: '600px',
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <Flex align={'center'} gap={'2'} pr={'1'}>
              <Flex>
                {icon}
                <Text color={getTextColor(t)} weight={'regular'}>
                  {message}
                </Text>
              </Flex>

              <IconButton
                variant={'ghost'}
                radius={'full'}
                color={'gray'}
                onClick={() => toast.dismiss(t.id)}
              >
                <CloseIcon />
              </IconButton>
            </Flex>
          )}
        </ToastBar>
      )}
    </HotToaster>
  );
}

export default Toaster;
