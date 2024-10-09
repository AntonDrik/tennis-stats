import { Box, Flex, Heading, IconButton, Table, Text } from '@radix-ui/themes';
import { IUserWithRatingDiff } from '@tennis-stats/types';
import { useNavigate } from 'react-router-dom';
import { useUsersQuery } from '../../core/api';
import { appRoutes } from '../../routes/routes.constant';
import { Page, Spinner, useModal } from '../../shared/components';
import useMediaQuery from '../../shared/hooks/useMediaQuery';
import useUserPermissions from '../../shared/hooks/useUserPermissions';
import { DoubleArrowUpIcon, DoubleArrowDownIcon, PlusIcon } from '../../shared/svg-icons';
import CreateUserModal from './modals/CreateUserModal/CreateUserModal';

export default function UsersPage() {
  const { data: usersList, isLoading } = useUsersQuery();

  const modal = useModal();
  const navigate = useNavigate();
  const permissions = useUserPermissions();
  const isMobileDevice = useMediaQuery('only screen and (max-width : 576px)');

  const handleNewUserClick = () => {
    modal.open(<CreateUserModal />);
  };

  const handleRowClick = (user: IUserWithRatingDiff) => {
    navigate(appRoutes.PROFILE(user.id));
  };

  const getRatingInfo = (user: IUserWithRatingDiff) => {
    const rating = Number(user.ratingDiff);

    if (rating === 0) {
      return { color: 'inherit', icon: null };
    }

    if (rating > 0) {
      return {
        color: 'var(--green-a11)',
        icon: <DoubleArrowUpIcon fill={'var(--green-a11)'} />,
      };
    }

    return {
      color: 'var(--red-a11)',
      icon: <DoubleArrowDownIcon fill={'var(--red-a11)'} />,
    };
  };

  return (
    <Page title={'Пользователи'}>
      <Flex direction={'column'}>
        <Flex
          align={'center'}
          mb={'4'}
          gap={'2'}
          width={isMobileDevice ? '100%' : 'auto'}
          justify={isMobileDevice ? 'between' : 'start'}
        >
          <Heading size={'7'}>Пользователи</Heading>

          {permissions.canCreateUser && (
            <IconButton color={'green'} onClick={handleNewUserClick}>
              <PlusIcon />
            </IconButton>
          )}
        </Flex>

        <Table.Root variant={'surface'}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Никнейм</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Рейтинг</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          {usersList?.length && usersList.length > 0 && (
            <Table.Body>
              {usersList.map((user) => {
                const ratingInfo = getRatingInfo(user);

                return (
                  <Table.Row key={user.id}>
                    <Table.RowHeaderCell style={{ verticalAlign: 'middle' }}>
                      <Text weight={'medium'} size={'3'}>
                        {user.nickname}
                      </Text>
                    </Table.RowHeaderCell>

                    <Table.Cell style={{ verticalAlign: 'middle' }}>
                      <Text
                        style={{
                          color: ratingInfo.color,
                          display: 'flex',
                          alignItems: 'center',
                        }}
                        weight={'medium'}
                      >
                        {Math.round(user.rating)} ({user.ratingDiff}){ratingInfo.icon}
                      </Text>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          )}

          {isLoading && (
            <Table.Body>
              <Table.Row style={{ position: 'relative' }}>
                <Table.RowHeaderCell>
                  <Box p={'5'}>
                    <Spinner />
                  </Box>
                </Table.RowHeaderCell>
              </Table.Row>
            </Table.Body>
          )}

          {usersList && !usersList.length && (
            <Table.Body>
              <Table.Row>
                <Table.RowHeaderCell colSpan={2} align={'center'}>
                  Нет пользователей
                </Table.RowHeaderCell>
              </Table.Row>
            </Table.Body>
          )}
        </Table.Root>
      </Flex>
    </Page>
  );
}
