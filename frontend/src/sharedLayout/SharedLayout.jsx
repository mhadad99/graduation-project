import React from 'react'
import { Outlet } from 'react-router-dom'
import  Footer  from '../components/Footer'
import Header from '../components/Header'
export function SharedLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}