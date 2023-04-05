
import React from 'react'

export default function NavBar() {
    let navItems
    switch (window.location.pathname) {
        case '/':
            navItems = <>
                <li className='nav-item'>
                    <a className='nav-link active' href='/'>Home</a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link' href='/movies'>Movie List</a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link' href='/podcasts'>My Podcasts</a>
                </li>
            </>
            break
        case '/movies':
            navItems = <>
                <li className='nav-item'>
                    <a className='nav-link' href='/'>Home</a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link active' href='/movies'>Movie List</a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link' href='/podcasts'>My Podcasts</a>
                </li>
            </>
            break
        case '/podcasts':
            navItems = <>
                <li className='nav-item'>
                    <a className='nav-link' href='/'>Home</a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link' href='/movies'>Movie List</a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link active' href='/podcasts'>My Podcasts</a>
                </li>
            </>
            break
        default:
            navItems = <>
                <li className='nav-item'>
                    <a className='nav-link active' href='/'>Home</a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link' href='/movies'>Movie List</a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link' href='/podcasts'>My Podcasts</a>
                </li>
            </>
    }
    return (
        <section className='bg-dark'>
            <nav className='navbar navbar-expand-lg navbar-dark'>
                <div className='container'>
                    <a className='navbar-brand' href='/'>
                        The Joel Hilton Film Collection
                    </a>
                    <div className='collapse navbar-collapse'>
                        <ul className='navbar-nav mr-auto nav-pills nav-fill'>
                            { navItems }
                        </ul>
                    </div>
                </div>
            </nav>
        </section>
    )
}
