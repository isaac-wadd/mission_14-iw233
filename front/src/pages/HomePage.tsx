
import React from 'react'

export default function HomePage() {
    return (
        <>
            <br />
            <h3 className='display-4 text-center'>The Joel Hilton Movie Collection</h3>
            <br />
            <div className='text-center'>
                <img src={process.env.PUBLIC_URL + '/JoelHiltonHeadshot.jpg'} alt='Joel Hilton' />
            </div>
        </>
    )
}
