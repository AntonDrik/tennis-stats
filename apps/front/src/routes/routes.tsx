import React, { ReactElement } from 'react'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'
import { StatsPage, UsersPage, TourPage, ToursPage, MatchOrderPage } from '../pages'
import MainRoute from './MainRoute'
import { appRoutes } from './routes.constant'


const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path={'/'}>
            
            <Route index element={<Navigate to={appRoutes.TOURS_LIST}/>}/>
            <Route path="*" element={<Navigate to={appRoutes.TOURS_LIST}/>}/>
            
            {/*В дальнейшем эти роуты будут с авторизацией*/}
            <Route element={<MainRoute/>}>
                <Route path={appRoutes.USERS} element={<UsersPage/>}/>
                
                <Route path={appRoutes.STATS} element={<StatsPage/>}/>
                
                <Route path={appRoutes.TOURS_LIST} element={<ToursPage/>}/>
                <Route path={appRoutes.TOUR_BY_ID()} element={<TourPage/>}/>
                
                <Route path={appRoutes.MATCH_ORDER} element={<MatchOrderPage/>}/>
            </Route>
        
        </Route>
    )
)

export default function AppRoutes(): ReactElement {
    return <RouterProvider router={routes}/>
}