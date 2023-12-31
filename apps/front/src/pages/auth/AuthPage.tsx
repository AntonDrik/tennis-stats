import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useLoginMutation from '../../core/api/authApi/useLoginMutation'
import { appRoutes } from '../../routes/routes.constant'

import Styled from './AuthPage.styles'


function AuthPage() {
    const navigate = useNavigate()
    
    const auth = useLoginMutation()
    
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    
    const handleClick = () => {
        auth.mutateAsync({ login, password })
            .then((response) => {
                if (!response.user) {
                    return
                }
                
                navigate(appRoutes.TOURS_LIST)
            })
    }
    
    return (
        <Styled.Card gap={2}>
            <Typography variant={'h2'} mb={2}>Авторизация</Typography>
            
            <TextField
                placeholder={'Введите логин'}
                value={login}
                onChange={(e) => setLogin(e.target.value as string)}
            />
            
            <TextField
                placeholder={'Введите пароль'}
                value={password}
                type={'password'}
                onChange={(e) => setPassword(e.target.value as string)}
            />
            
            <Box mt={2}>
                <Button
                    fullWidth
                    variant={'contained'}
                    onClick={handleClick}
                >Войти</Button>
            </Box>
        </Styled.Card>
    )
    
    
}

export default AuthPage