import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import Button from '@mui/material/Button'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { CreateUserDto } from '@tennis-stats/dto'
import { useEffect } from 'react'
import * as React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { MuiColorInput } from 'mui-color-input'
import { useCreateUserMutation } from '../../../../core/api'
import { Spinner, useModal } from '../../../../shared/components'
import { getTextFieldError } from '../../../../utils'


function CreateUserModal() {
    
    const { mutateAsync, isLoading } = useCreateUserMutation()
    
    const modal = useModal()
    
    const form = useForm<CreateUserDto>({
        mode: 'onChange',
        resolver: classValidatorResolver(CreateUserDto)
    })
    
    const colorValue = form.watch('color')
    
    const submit = (form: CreateUserDto) => {
        mutateAsync(form).then(() => {
            modal.close()
        })
    }
    
    useEffect(() => {
        form.setValue('color', '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'))
    }, [])
    
    return (
        <>
            {isLoading && <Spinner/>}
            
            <DialogTitle align={'center'}>
                Создание пользователя
            </DialogTitle>
            
            <DialogContent>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(submit)}>
                        <Stack spacing={3} pt={2}>
                            <TextField
                                label="Имя"
                                size={'small'}
                                {...form.register('firstName')}
                                {...getTextFieldError(form.formState.errors, 'firstName')}
                            />
                            
                            <TextField
                                label="Фамилия"
                                size={'small'}
                                {...form.register('lastName')}
                                {...getTextFieldError(form.formState.errors, 'lastName')}
                            />
                            
                            <TextField
                                label="Логин"
                                size={'small'}
                                {...form.register('login')}
                                {...getTextFieldError(form.formState.errors, 'login')}
                            />
                            
                            <TextField
                                label="Пароль"
                                size={'small'}
                                {...form.register('password')}
                                {...getTextFieldError(form.formState.errors, 'password')}
                            />
    
                            <TextField
                                label="Стартовый рейтинг"
                                InputLabelProps={{ shrink: true }}
                                defaultValue={100}
                                size={'small'}
                                {...form.register('rating', { valueAsNumber: true })}
                                {...getTextFieldError(form.formState.errors, 'rating')}
                            />
                            
                            <MuiColorInput
                                value={colorValue}
                                format={'hex'}
                                label={'Цвет'}
                                onChange={(value) => form.setValue('color', value)}
                            />
                        </Stack>
                        
                        <Button
                            fullWidth
                            variant={'contained'}
                            type={'submit'}
                            sx={{ mt: 4 }}
                        >
                            Создать
                        </Button>
                    </form>
                </FormProvider>
            </DialogContent>
        </>
    )
    
}


export default CreateUserModal