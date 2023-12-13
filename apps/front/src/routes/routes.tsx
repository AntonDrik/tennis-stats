import React, { ReactElement } from 'react'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'
import { StatsPage, GameProcessPage, UsersPage, TourPage } from '../pages'
import MainRoute from './MainRoute'
import { EAppRoutes } from './routes.constant'


const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path={'/'}>
            
            <Route index element={<Navigate to={EAppRoutes.GAME_PROCESS}/>}/>
            <Route path="*" element={<Navigate to={EAppRoutes.GAME_PROCESS}/>}/>
            
            {/*В дальнейшем эти роуты будут с авторизацией*/}
            <Route element={<MainRoute/>}>
                <Route path={EAppRoutes.USERS} element={<UsersPage/>}/>
                <Route path={EAppRoutes.STATS} element={<StatsPage/>}/>
                <Route path={EAppRoutes.GAME_PROCESS} element={<GameProcessPage/>}/>
                
                <Route path={EAppRoutes.TOUR} element={<TourPage/>}/>
            </Route>
        
        </Route>
    )
)

export default function AppRoutes(): ReactElement {
    return <RouterProvider router={routes}/>
}