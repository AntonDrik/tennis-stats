import { Table } from '@radix-ui/themes';
import { IUser } from '@tennis-stats/types';
import AdminActionsCell from './components/AdminActionsCell/AdminActionsCell';

interface IProps {
  isAdmin?: boolean;
  usersList: IUser[];
}

function RegistrationTable(props: IProps) {
  return (
    <Table.Root variant={'surface'} size={'1'}>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Никнейм</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Рейтинг</Table.ColumnHeaderCell>
          {props.isAdmin && <Table.ColumnHeaderCell>Действия</Table.ColumnHeaderCell>}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {props.usersList.map((user) => {
          return (
            <Table.Row key={user.id}>
              <Table.RowHeaderCell style={{ verticalAlign: 'middle' }}>
                {user.nickname}
              </Table.RowHeaderCell>

              <Table.Cell style={{ verticalAlign: 'middle' }}>
                {Math.round(user.rating)}
              </Table.Cell>

              {props.isAdmin && (
                <Table.Cell width={'30px'}>
                  <AdminActionsCell user={user} />
                </Table.Cell>
              )}
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
}

export default RegistrationTable;
