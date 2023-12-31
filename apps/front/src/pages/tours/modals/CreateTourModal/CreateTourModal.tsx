import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import parseISO from 'date-fns/parseISO'
import { useEffect } from 'react'
import * as React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { Button, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
import { CreateTourDto } from '@tennis-stats/dto'
import { ITour, IUser } from '@tennis-stats/types'

import { Spinner, useModal } from '../../../../shared/components'
import useCreateTourMutation from '../../../../core/api/toursApi/useCreateTourMutation'
import { getTextFieldError } from '../../../../utils'
import UsersAutocomplete from './components/UsersAutocomplete/UsersAutocomplete'


interface IProps {
    onCreateTour: (tour: ITour) => void
}

function CreateTourModal({ onCreateTour }: IProps) {
    
    const { isLoading, mutateAsync } = useCreateTourMutation()
    
    const modal = useModal()
    
    const form = useForm<CreateTourDto>({
        mode: 'onChange',
        resolver: classValidatorResolver(CreateTourDto)
    })
    
    const date = form.watch('date')
    
    const submit = (form: CreateTourDto) => {
        mutateAsync(form).then((tour) => {
            modal.close()
            onCreateTour(tour)
        })
    }
    
    const handleAutocompleteChange = (activeUsers: IUser[]) => {
        const usersIdsList = activeUsers.map((user) => user.id)
        
        form.setValue('usersIds', usersIdsList, { shouldDirty: true })
    }
    
    const handleDatePickerChange = (newDate: Date | null) => {
        if (newDate) {
            form.setValue('date', newDate.toISOString())
        }
    }
    
    useEffect(() => {
        form.setValue('setsCount', 1)
        form.setValue('date', new Date().toISOString())
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
    
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <MuiDatePicker
                                    label="Дата"
                                    value={parseISO(date)}
                                    onChange={handleDatePickerChange}
                                />
                            </LocalizationProvider>
                            
                            <UsersAutocomplete
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