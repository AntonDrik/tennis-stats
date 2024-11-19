import { useAtomValue } from 'jotai/index';
import { Navigate, Outlet } from 'react-router-dom';
import { meAtom } from '../core/store';
import MainLayout from '../layouts/MainLayout/MainLayout';
import { appRoutes } from './routes.constant';

function MainRoute() {
  const me = useAtomValue(meAtom);

  if (me?.id === -1) {
    return <Navigate to={appRoutes.LOGIN} />;
  }

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

export default MainRoute;
