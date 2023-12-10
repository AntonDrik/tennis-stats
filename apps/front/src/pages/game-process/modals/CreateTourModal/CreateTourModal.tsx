import { useEffect } from 'react'
import * as React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { Button, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
import { CreateTourDto } from '@tennis-stats/dto'
import { IUser } from '@tennis-stats/types'

import { Spinner } from '../../../../shared/components'
import useCreateTourMutation from '../../../../core/api/toursApi/useCreateTourMutation'
import { getTextFieldError } from '../../../../utils'
import PlayersAutocomplete from './UsersAutocomplete'


function CreateTourModal() {
    
    const { mutate, isLoading } = useCreateTourMutation()
    
    const form = useForm<CreateTourDto>({
        mode: 'onChange',
        resolver: classValidatorResolver(CreateTourDto)
    })
    
    const submit = (form: CreateTourDto) => {
        mutate(form)
    }
    
    const handleAutocompleteChange = (activeUsers: IUser[]) => {
        const usersIdsList = activeUsers.map((user) => user.id)
        
        form.setValue('usersIds', usersIdsList, { shouldDirty: true })
    }
    
    useEffect(() => {
        form.setValue('setsCount', 3)
    }, [])
    
    return (
        <>
            <DialogTitle
                align={'center'}
                variant={'h5'}
                textTransform={'uppercase'}
            >Создать новый тур</DialogTitle>
            
            <DialogContent>
                {isLoading && <Spinner/>}
                
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(submit)}>
                        
                        <Stack spacing={3} direction={'column'} sx={{ mt: 2 }}>
                            
                            <PlayersAutocomplete
                                onChange={handleAutocompleteChange}
                            />
                            
                            <TextField
                                label="Количество сетов"
                                type={'number'}
                                InputLabelProps={{ shrink: true }}
                                size={'small'}
                                {...form.register('setsCount', { valueAsNumber: true })}
                                {...getTextFieldError(form.formState.errors, 'setsCount')}
                            />
                        </Stack>
                        
                        <Button
                            variant={'contained'}
                            color={'primary'}
                            type={'submit'}
                            sx={{ mt: 2 }}
                            disabled={!form.formState.isDirty}
                        >
                            Создать
                        </Button>
                    
                    </form>
                </FormProvider>
            
            </DialogContent>
        </>
    )
}

export default CreateTourModal