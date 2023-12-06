import React, { ReactElement } from 'react'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'
import { StatsPage, GameProcessPage, UsersPage } from '../pages'
import MainRoute from './MainRoute'


const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path={'/'}>
            
            <Route index element={<Navigate to={'users'}/>}/>
            <Route path="*" element={<Navigate to={'users'}/>}/>
            
            {/*В дальнейшем эти роуты будут с авторизацией*/}
            <Route element={<MainRoute/>}>
                <Route path={'users'} element={<UsersPage/>}/>
                <Route path={'stats'} element={<StatsPage/>}/>
                <Route path={'game-process'} element={<GameProcessPage/>}/>
            </Route>
        
        </Route>
    )
)

export default function AppRoutes(): ReactElement {
    return <RouterProvider router={routes}/>
}