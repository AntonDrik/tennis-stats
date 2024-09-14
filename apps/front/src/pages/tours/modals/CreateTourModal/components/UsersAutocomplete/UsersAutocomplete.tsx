import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import { CreateTourDto } from '@tennis-stats/dto'
import { IUser } from '@tennis-stats/types'
import React, { useEffect, useState } from 'react'
import { useFormState } from 'react-hook-form'
import { useUsersQuery } from '../../../../../../core/api'
import { getTextFieldError } from '../../../../../../utils'


interface IProps {
    onChange?: (users: IUser[]) => void
}

function UsersAutocomplete({ onChange }: IProps) {
    
    const { data: allUsers, isLoading } = useUsersQuery()
    
    const form = useFormState<CreateTourDto>()
    
    const [selectedUsers, setSelectedUsers] = useState<IUser[]>([])
    
    const handleChange = (value: IUser[] | null) => {
        if (!value) {
            return
        }
        
        setSelectedUsers(value)
        onChange?.(value)
    }
    
    useEffect(() => {
        if (!allUsers?.length) {
            return
        }
        
        setSelectedUsers(allUsers)
        onChange?.(allUsers)
    }, [allUsers])
    
    return (
        <Autocomplete
            multiple
            options={allUsers ?? []}
            value={selectedUsers}
            getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            size={'small'}
            loading={isLoading}
            onChange={(e, value) => handleChange(value)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    id={''}
                    sx={{ minWidth: 200 }}
                    label="Игроки"
                    {...getTextFieldError(form.errors, 'usersIds')}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {isLoading ? <CircularProgress color="inherit" size={20}/> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        )
                    }}
                />
            )}
        />
    )
    
}

export default UsersAutocomplete