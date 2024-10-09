import {
  Box,
  Button,
  Checkbox,
  Dialog,
  Flex,
  ScrollArea,
  Spinner,
  Table,
} from '@radix-ui/themes';
import { IUser } from '@tennis-stats/types';
import * as React from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useJoinTournamentMutation } from '../../../../core/api';
import { useModal } from '../../../../shared/components';
import { DialogCloseButton } from '../../../../shared/components/Modals';
import { useMultiCheckboxState } from '../../../../shared/hooks';

import Styled from './AddUserModal.styles';
import useNotJoinedUsers from './hooks/useNotJoinedUsers';

interface IProps {
  joinedUsers: IUser[];
}

function AddUsersToTournamentModal(props: IProps) {
  const joinTournament = useJoinTournamentMutation();

  const [selectedUsersIds, setSelectedUsersIds] = useState<number[]>([]);

  const modal = useModal();
  const notJoinedUsers = useNotJoinedUsers(props.joinedUsers);
  const checkboxState = useMultiCheckboxState(selectedUsersIds, notJoinedUsers);

  const isSelectedUser = (user: IUser) => {
    return selectedUsersIds.includes(user.id);
  };

  const addUsersToTournament = () => {
    joinTournament.mutateAsync({ usersIds: selectedUsersIds }).then(() => {
      toast.success('Пользователи успешно зарегистрированы в турнире');
      modal.close();
    });
  };

  const handleRowClick = (user: IUser) => {
    if (isSelectedUser(user)) {
      const newList = selectedUsersIds.filter((userId) => userId !== user.id);
      setSelectedUsersIds(newList);

      return;
    }
    setSelectedUsersIds((prev) => [...prev, user.id]);
  };

  const handleMultiCheckboxChange = (checked: boolean | 'indeterminate') => {
    if (checked) {
      setSelectedUsersIds(notJoinedUsers.map((user) => user.id));
    } else {
      setSelectedUsersIds([]);
    }
  };

  return (
    <Dialog.Content
      maxHeight={'90vh'}
      onOpenAutoFocus={(event) => event.preventDefault()}
    >
      <DialogCloseButton />

      <Dialog.Title>Добавить пользователей на турнир</Dialog.Title>

      <Box pt={'2'} mr={'-3'}>
        <ScrollArea scrollbars="vertical" style={{ maxHeight: 400 }}>
          <Box pr={'3'}>
            <Table.Root variant={'surface'} size={'1'}>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell width={'30px'}>
                    <Checkbox
                      checked={checkboxState}
                      onCheckedChange={handleMultiCheckboxChange}
                    />
                  </Table.ColumnHeaderCell>

                  <Table.ColumnHeaderCell>Никнейм</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Рейтинг</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {notJoinedUsers.map((user) => {
                  return (
                    <Styled.Row key={user.id} onClick={() => handleRowClick(user)}>
                      <Table.RowHeaderCell style={{ verticalAlign: 'middle' }}>
                        <Checkbox
                          checked={isSelectedUser(user)}
                          style={{ marginTop: 0.5 }}
                        />
                      </Table.RowHeaderCell>

                      <Table.RowHeaderCell style={{ verticalAlign: 'middle' }}>
                        {user.nickname}
                      </Table.RowHeaderCell>

                      <Table.Cell style={{ verticalAlign: 'middle' }}>
                        {Math.round(user.rating)}
                      </Table.Cell>
                    </Styled.Row>
                  );
                })}
              </Table.Body>
            </Table.Root>
          </Box>
        </ScrollArea>
      </Box>

      <Flex mt={'4'} justify={'end'}>
        <Button
          variant={'solid'}
          style={{ alignSelf: 'flex-end' }}
          disabled={joinTournament.isLoading || !selectedUsersIds.length}
          onClick={addUsersToTournament}
        >
          {joinTournament.isLoading && <Spinner />}
          Добавить {selectedUsersIds.length ? selectedUsersIds.length : ''}
        </Button>
      </Flex>
    </Dialog.Content>
  );
}

export default AddUsersToTournamentModal;
