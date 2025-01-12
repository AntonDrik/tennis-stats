import { IconButton, Table, Text } from '@radix-ui/themes';
import { ILeaderboardItem, IUser } from '@tennis-stats/types';
import { memo } from 'react';
import { TrashIcon } from '../../../svg-icons';

interface IProps {
  leaderboardItems: ILeaderboardItem[] | undefined;
  size?: '1' | '2' | '3';
  onlyTotal?: boolean;
  hideUsersIds?: number[];
  onRemove?: (user: IUser) => void;
}

function Leaderboard(props: IProps) {
  if (!props.leaderboardItems) {
    return <Text>Нет данных</Text>;
  }

  return (
    <Table.Root variant={'surface'} size={props.size ?? '1'}>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell align={'center'}>#</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Игрок</Table.ColumnHeaderCell>

          <Table.ColumnHeaderCell align="center">Г</Table.ColumnHeaderCell>

          <Table.ColumnHeaderCell align="center">Побед</Table.ColumnHeaderCell>

          {props.onRemove && <Table.ColumnHeaderCell></Table.ColumnHeaderCell>}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {props.leaderboardItems
          .filter((item) => !props.hideUsersIds?.includes(item.user.id))
          .map((item, index) => {
            return (
              <Table.Row key={`leaderboard-item-${index}`}>
                <Table.RowHeaderCell
                  align={'center'}
                  style={{ verticalAlign: 'middle' }}
                  width={'40px'}
                >
                  {index + 1}
                </Table.RowHeaderCell>

                <Table.Cell style={{ verticalAlign: 'middle' }}>
                  <Text weight={'bold'}>{item.user.nickname}</Text>
                </Table.Cell>

                <Table.Cell
                  style={{ verticalAlign: 'middle' }}
                  align={'center'}
                  width={'40px'}
                >
                  {item.scoreDiff}
                </Table.Cell>

                <Table.Cell
                  style={{ verticalAlign: 'middle' }}
                  align={'center'}
                  width={'60px'}
                >
                  {item.wins}
                </Table.Cell>

                {props.onRemove && (
                  <Table.Cell align="center" width={'20px'}>
                    <IconButton
                      type={'button'}
                      size={'1'}
                      variant={'surface'}
                      color={'red'}
                      onClick={() => props.onRemove?.(item.user)}
                    >
                      <TrashIcon />
                    </IconButton>
                  </Table.Cell>
                )}
              </Table.Row>
            );
          })}
      </Table.Body>
    </Table.Root>
  );
}

export default memo(Leaderboard);
