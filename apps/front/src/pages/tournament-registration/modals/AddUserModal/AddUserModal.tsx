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
import useExtendedUsers from './hooks/useExtendedUsers';

interface IProps {
  tournamentId: number;
  joinedUsers: IUser[];
}

function AddUsersToTournamentModal(props: IProps) {
  const joinTournamentMutation = useJoinTournamentMutation(props.tournamentId);

  const [selectedUsersIds, setSelectedUsersIds] = useState<number[]>([]);

  const modal = useModal();
  const users = useExtendedUsers(props.joinedUsers);
  const checkboxState = useMultiCheckboxState(selectedUsersIds, users.notJoinedList);

  const isSelectedUser = (user: IUser) => selectedUsersIds.includes(user.id);
  const isJoinedUser = (user: IUser) => users.joinedIdsList.includes(user.id);

  const addUsersToTournament = () => {
    joinTournamentMutation.mutateAsync({ usersIds: selectedUsersIds }).then(() => {
      toast.success('Пользователи успешно добавлены в турнир');
      modal.close();
    });
  };

  const handleRowClick = (user: IUser) => {
    if (isSelectedUser(user) || isJoinedUser(user)) {
      setSelectedUsersIds((prev) => prev.filter((userId) => userId !== user.id));

      return;
    }

    setSelectedUsersIds((prev) => [...prev, user.id]);
  };

  const handleMultiCheckboxChange = (checked: boolean | 'indeterminate') => {
    if (checked) {
      setSelectedUsersIds(users.notJoinedList.map((user) => user.id));
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
                {users.allList.map((user) => {
                  return (
                    <Styled.Row key={user.id} onClick={() => handleRowClick(user)}>
                      <Table.RowHeaderCell style={{ verticalAlign: 'middle' }}>
                        <Checkbox
                          checked={isSelectedUser(user) || isJoinedUser(user)}
                          disabled={isJoinedUser(user)}
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
          disabled={joinTournamentMutation.isLoading || !selectedUsersIds.length}
          onClick={addUsersToTournament}
        >
          {joinTournamentMutation.isLoading && <Spinner />}
          Добавить {selectedUsersIds.length ? selectedUsersIds.length : ''}
        </Button>
      </Flex>
    </Dialog.Content>
  );
}

export default AddUsersToTournamentModal;
