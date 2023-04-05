
import React from 'react'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import MoviesPage from './pages/MoviesPage'
import Podcasts from './components/Podcasts'

export default function App() {

// default component used for page is home, otherwise check route
  let component = <HomePage />

// check which page needs to be shown
  switch (window.location.pathname) {
    case '/movies':
      component = <MoviesPage />
      break
    case '/podcasts':
      component = <Podcasts />
      break
    default:
      component = <HomePage />
  }

// universal layout: navbar, main body (section) then footer
  return (
    <>
      <NavBar />
      <br />
      <section className='container container-fluid text-center'>
        { component }
      </section>
      <Footer />
    </>
  );
}
