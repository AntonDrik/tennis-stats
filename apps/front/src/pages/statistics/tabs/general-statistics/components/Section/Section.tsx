import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { ReactElement } from 'react'


interface IProps {
    title: string
    icon: ReactElement
    children: ReactElement
}

function Section({title, icon, children}: IProps) {
    
    return (
        <Stack>
            <Stack direction={'row'} spacing={1} sx={{mb: 2}}>
                {icon}
                <Typography variant={'h4'}>{title}</Typography>
            </Stack>
    
            {children}
        </Stack>
    )
    
}

export default Section