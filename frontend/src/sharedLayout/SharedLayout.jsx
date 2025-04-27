import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import  Footer  from '../components/Footer'
import Header from '../components/Header'
export function SharedLayout() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
            <Outlet />
            <Footer />
        </>
    )
}