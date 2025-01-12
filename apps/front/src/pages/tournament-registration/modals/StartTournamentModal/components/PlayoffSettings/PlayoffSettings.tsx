import { ITournament } from '@tennis-stats/types';
import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { PlayoffToggle } from '../../../../../../shared/components';

interface IProps {
  tournament: ITournament;
}

function PlayoffSettings(props: IProps) {
  const form = useFormContext();

  useEffect(() => {
    const usersIds = props.tournament.registeredUsers.map((user) => user.id);
    form.setValue('playoffOptions.activeUsersIds', usersIds);

    return () => {
      form.setValue('playoffOptions.activeUsersIds', []);
    };
  }, [props.tournament.registeredUsers]);

  return (
    <Controller
      name={'playoffOptions.stage'}
      control={form.control}
      render={({ field }) => <PlayoffToggle label={'Тип плейоффа'} {...field} />}
    />
  );
}

export default PlayoffSettings;
