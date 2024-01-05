import Button from '@mui/material/Button'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import { useCreateMatchOrderMutation, useGetMatchOrderQuery } from '../../core/api/matchOrderApi'
import { Page, Spinner } from '../../shared/components'
import OrderItem from './components/OrderItem/OrderItem'


function MatchOrderPage() {
    
    const createMatch = useCreateMatchOrderMutation()
    const matchQuery = useGetMatchOrderQuery()
    
    const handleClick = () => {
        void createMatch.mutateAsync()
    }
    
    return (
        <Page title={'Генератор очередности матчей'}>
            {matchQuery.isLoading && <Spinner/>}
            
            <Button
                variant={'contained'}
                onClick={handleClick}
                disabled={createMatch.isLoading}
            >
                Сгенерировать <br/>очередность матчей на сегодня
            </Button>
            
            {
                matchQuery.data &&
                <Stepper orientation="vertical" sx={{mt: 5, overflow: 'auto'}}>
                    {
                        matchQuery.data.map((order) => (
                            <Step active={true} key={order.order}>
                                <StepLabel>
                                    <OrderItem order={order}/>
                                </StepLabel>
                            </Step>
                        ))
                    }
                </Stepper>
            }
        
        </Page>
    )
    
}

export default MatchOrderPage