import { Outlet } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout/AuthLayout'


function AuthRoute() {
    
    return (
        <AuthLayout>
            <Outlet/>
        </AuthLayout>
    )
    
}

export default AuthRoute