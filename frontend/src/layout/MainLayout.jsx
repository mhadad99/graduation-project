import React from 'react'
import { Header } from '../components/Header'
import { HomeHero } from '../components/HomeHero'
import { HomeCategory } from '../components/HomeCategory'
import { Footer } from '../components/Footer'

export function MainLayout() {
  return (
    <>
        <Header></Header>
        <HomeHero></HomeHero>
        <HomeCategory></HomeCategory>
        <Footer></Footer>
    </>
  )
}
