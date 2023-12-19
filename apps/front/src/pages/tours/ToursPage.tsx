import { useGetToursListQuery } from '../../core/api'
import { Page, Spinner } from '../../shared/components'
import NewTourButton from './components/NewTourButton/NewTourButton'
import ToursTable from './components/Table/Table'


function ToursPage() {
    
    const toursQuery = useGetToursListQuery({
        sortByDate: true
    })
    
    return (
        <Page title={'Список туров'}>
            {toursQuery.isLoading && <Spinner/>}
            
            <NewTourButton/>
            
            {
                toursQuery.data &&
                <ToursTable toursList={toursQuery.data}/>
            }
        
        </Page>
    )
    
}

export default ToursPage