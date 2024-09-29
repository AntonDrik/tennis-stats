import { TextFieldProps } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { IUser } from '@tennis-stats/types';
import React, { useMemo, useState } from 'react';
import { useUsersQuery } from '../../../../core/api';

interface IProps {
  skipUsers?: (IUser | undefined)[];
  textFieldProps?: TextFieldProps;
  onChange?: (users: IUser) => void;
}

function UsersSelect(props: IProps) {
  const { data: allUsers, isLoading } = useUsersQuery();

  const [selectedUsers, setSelectedUsers] = useState<IUser>();

  const handleChange = (value: IUser | null) => {
    if (!value) {
      return;
    }

    setSelectedUsers(value);
    props.onChange?.(value);
  };

  const usersToDisplay = useMemo(() => {
    const skipIds = props.skipUsers?.map((user) => user?.id) ?? [];

    return (allUsers ?? []).filter((user) => !skipIds.includes(user.id));
  }, [allUsers, props.skipUsers]);

  return (
    <Autocomplete
      options={usersToDisplay}
      value={selectedUsers}
      getOptionLabel={(option) => `${option.nickname}`}
      getOptionKey={(option) => option.id}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      size={'small'}
      loading={isLoading}
      onChange={(e, value) => handleChange(value)}
      renderInput={(params) => (
        <TextField
          sx={{ minWidth: 200 }}
          label="Пользователи"
          {...params}
          {...props.textFieldProps}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

export default UsersSelect;
