import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { IUser } from '@tennis-stats/types'
import { format } from 'date-fns'
import ruLocale from 'date-fns/locale/ru'
import { useState } from 'react'
import { useGenerateSequenceMutation } from '../../core/api/sequenceGeneratorApi'
import { Page } from '../../shared/components'


function SequenceGeneratorPage() {
    
    const { mutateAsync } = useGenerateSequenceMutation()
    
    const [users, setUsers] = useState<[[IUser, IUser]]>()
    
    const handleClick = () => {
        mutateAsync().then((data) => {
            setUsers(data)
        })
    }
    
    
    return (
        <Page title={'Генератор очередности'}>
            <Button
                variant={'contained'}
                onClick={handleClick}
            >
                Сгенерировать очередность на <br/>{format(new Date(), 'dd MMM yyyy', { locale: ruLocale })}
            </Button>
    
    
            {
                (users ?? []).map((u) => (
                    <Stack direction={'column'}>
                        <Typography>{u[0].fullName}</Typography>
                        <Typography>{u[1].fullName}</Typography>
                    </Stack>
                ))
            }
        </Page>
    )
    
}

export default SequenceGeneratorPage