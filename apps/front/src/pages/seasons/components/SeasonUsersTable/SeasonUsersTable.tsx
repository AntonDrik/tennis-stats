import { Table } from '@radix-ui/themes';
import { ISeasonWithStats } from '@tennis-stats/types';
import { useAtomValue } from 'jotai/index';
import React, { useMemo } from 'react';
import { meAtom } from '../../../../core/store';
import { usePagination } from '../../../../shared/components';
import Paginator from '../../../../shared/components/Pagination/Paginator';

interface IProps {
  season: ISeasonWithStats;
  itemsPerPage: number;
}

const cellStyle: { style: React.CSSProperties } = {
  style: { verticalAlign: 'middle', whiteSpace: 'nowrap' },
};

function SeasonUsersTable(props: IProps) {
  const { itemsPerPage, season } = props;

  const me = useAtomValue(meAtom);
  const paginator = usePagination(itemsPerPage, season.stats.usersData.length);

  const paginatedUsersData = useMemo(() => {
    const start = (paginator.currentPage - 1) * itemsPerPage;

    return season.stats.usersData.slice(start, start + itemsPerPage);
  }, [itemsPerPage, paginator.currentPage, season.stats.usersData]);

  return (
    <React.Fragment>
      <Table.Root variant={'surface'} size={'1'}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell minWidth={'140px'} {...cellStyle}>
              Никнейм
            </Table.ColumnHeaderCell>

            <Table.ColumnHeaderCell align={'center'}>Победы в&nbsp;матчах</Table.ColumnHeaderCell>

            <Table.ColumnHeaderCell align={'right'}>Сыграно турниров</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        {season.stats.usersData.length > 0 && (
          <Table.Body>
            {paginatedUsersData.map((userData) => {
              return (
                <Table.Row
                  key={userData.user.id}
                  style={{
                    backgroundColor: me?.id === userData.user.id ? 'var(--blue-3)' : 'inherit',
                  }}
                >
                  <Table.RowHeaderCell minWidth={'140px'} {...cellStyle}>
                    {userData.user.nickname}
                  </Table.RowHeaderCell>

                  <Table.Cell align={'center'} {...cellStyle}>
                    {`${userData.matchWinCount} / ${userData.matchesCount}`}
                  </Table.Cell>

                  <Table.Cell align={'right'} {...cellStyle}>
                    {`${userData.tournamentsCount} / ${season.stats.tournamentsCount}`}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        )}

        {season.stats.usersData.length <= 0 && (
          <Table.Body>
            <Table.Row>
              <Table.RowHeaderCell colSpan={3} align={'center'}>
                Нет данных
              </Table.RowHeaderCell>
            </Table.Row>
          </Table.Body>
        )}
      </Table.Root>

      <Paginator paginator={paginator} />
    </React.Fragment>
  );
}

export default SeasonUsersTable;
