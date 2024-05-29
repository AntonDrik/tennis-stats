import { useGetToursListQuery } from '../../core/api';
import { Page, Spinner } from '../../shared/components';
import { usePermissions } from '../../shared/hooks';
import NewTourButton from './components/NewTourButton/NewTourButton';
import ToursTable from './components/Table/Table';


function ToursPage() {

    const permissions = usePermissions();

    const toursQuery = useGetToursListQuery({
        sortByDate: true
    });

    return (
        <Page title={'Список туров'}>
            {toursQuery.isLoading && <Spinner />}

            {
                permissions.canCrudTour &&
                <NewTourButton />
            }

            {
                toursQuery.data &&
                <ToursTable toursList={toursQuery.data} />
            }

        </Page>
    );

}

export default ToursPage;
