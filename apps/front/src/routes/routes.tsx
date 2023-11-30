import React, { ReactElement } from 'react'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'
import { StatsPage, GameProcessPage } from '../pages'


const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path={'/'}>
            
            <Route index element={<Navigate to={'stats'}/>}/>
            <Route path="*" element={<Navigate to={'stats'}/>}/>
            
            <Route path={'stats'} element={<StatsPage/>}/>
            <Route path={'game-process'} element={<GameProcessPage/>}/>
        
        </Route>
    )
)

export default function AppRoutes(): ReactElement {
    return <RouterProvider router={routes}/>
}