
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect } from 'react'

export default function Pagination({ moviesPerPage, totalMovies, paginate, currPage } : { moviesPerPage: any, totalMovies: any, paginate: any, currPage: any }) {
    let pageNumbers: any[] = []
    let nextLiClass = 'page-item'
    let prevLiClass = 'page-item'

    for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) { pageNumbers.push(i) }

    const [prevPagesShown, setPrevPagesShown] = useState(3)
    const [nextPagesShown, setNextPagesShown] = useState(3)

    useEffect(() => {
        const getPrevAndNext = async () => {
            if (currPage <= 3) {
                setPrevPagesShown(currPage - 1)
            }
            else if (currPage >= pageNumbers.at(-1) - 3) {
                setNextPagesShown(pageNumbers.at(-1) - currPage)
            }
            else {
                setNextPagesShown(3)
                setPrevPagesShown(3)
            }
        }
        getPrevAndNext()
    })

    let pagesShown: any[] = []
    for (let j = currPage - prevPagesShown; j <= currPage + nextPagesShown; j++) { pagesShown.push(j) }

    switch (currPage) {
        case (pageNumbers.at(-1)):
            nextLiClass = nextLiClass + ' disabled'
            break
        case (pageNumbers.at(0)):
            prevLiClass = prevLiClass + ' disabled'
            break
    }

    return (
        <nav>
            <ul className='pagination'>
                <li className={prevLiClass}>
                    <a onClick={() => paginate(1)} className='page-link' href='#'>1</a>
                </li>
                <div> ... </div>
                <li className={prevLiClass}>
                    <a onClick={() => paginate(currPage - 1)} className='page-link' href='#'>
                        <i className="fa fa-solid fa-chevron-left"></i>
                    </a>
                </li>
                {
                    pagesShown.map((pageNum: Number) => {
                        let liClass = 'page-item'
                        if (currPage === pageNum) { liClass = liClass + ' active' }
                        return (
                            <li key={String(pageNum)} className={liClass}>
                                <a onClick={() => paginate(pageNum)} className='page-link' href='#'>{String(pageNum)}</a>
                            </li>
                        )
                    })
                }
                <li className={nextLiClass}>
                    <a onClick={() => paginate(currPage + 1)} className='page-link' href='#'>
                        <i className="fa fa-solid fa-chevron-right"></i>
                    </a>
                </li>
                <div> ... </div>
                <li className={nextLiClass}>
                    <a onClick={() => paginate(pageNumbers.at(-1))} className='page-link' href='#'>{pageNumbers.at(-1)}</a>
                </li>
            </ul>
        </nav>
    )
}
