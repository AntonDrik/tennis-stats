import { Outlet } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout/MainLayout';

function MainRoute() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

export default MainRoute;
