
import React, { useState, useEffect } from 'react'
import Pagination from '../components/Pagination'
import { Movie } from '../Models/Movie'

export default function MoviesPage () {

// using 'useState' for list of movies, current page number (for movies list) and count of movies per page
    const [moviesList, setMoviesList] = useState([])
    const [currPageNum, setPageNum] = useState(1)
    const [moviesPerPage] = useState(10)
    const [loading, setLoading] = useState(true)
    const [sortCol, setSortCol] = useState('title')

    const cols = [ 'title', 'year', 'director', 'category', 'rating', 'edited', 'lentTo', 'notes' ]
    const friendlyColNames = [ 'Title', 'Year', 'Director', 'Category', 'Rating', 'Edited', 'Lent To', 'Notes' ]

    useEffect(() => {
        const fetchMovieData = async () => {
            const res = await fetch('https://localhost:4000/api/Movies')
            let tmpData = await res.json()
            tmpData = [...tmpData].sort((a, b) => a[sortCol] > b[sortCol] ? 1 : -1 )
            tmpData = tmpData.filter((mov: Movie) => mov.edited.toLowerCase() === 'yes' )
            setMoviesList(tmpData)
            setLoading(false)
        }
        fetchMovieData()
    })

    if (loading) {
        return (
            <h3>
                <em>loading...</em>
            </h3>
        )
    }

    const firstMovieInd = (currPageNum - 1) * moviesPerPage
    const lastMovieInd = firstMovieInd + moviesPerPage
    const currMovies = moviesList.slice(firstMovieInd, lastMovieInd)

    let movNums: number[] = []
    for (let i = 0; i < moviesList.length; i++) { movNums.push(i) }
    movNums = movNums.slice(firstMovieInd, lastMovieInd)

    function paginate(pageNum: number) { setPageNum(pageNum) }

    function sortData(col: string) {
        setSortCol(col)
        setPageNum(1)
    }

    return (
        <>
            <h3 className='display-5 text-center'>Edited Movies</h3>
            <br />
            <table className='table table-striped table-bordered text-start'>
                <thead>
                    <tr>
                    {
                        cols.map((col: string, index: number) => {
                            const thClass = (col === sortCol ? 'table-info' : '')
                            return (
                                <th key={index} onClick={() => sortData(col)} className={thClass}>{friendlyColNames[index]}</th>
                            )
                        })
                    }
                    </tr>
                </thead>
                <tbody>
                {
                    currMovies.map((movie: Movie, index: number) => {
                        return (
                            <tr key={index}>
                                <td>{movie.title}</td>
                                <td>{Math.trunc(movie.year)}</td>
                                <td>{movie.director}</td>
                                <td>{movie.category}</td>
                                <td>{movie.rating}</td>
                                <td>{movie.edited}</td>
                                <td>{movie.lentTo}</td>
                                <td>{movie.notes}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
                <tfoot>
                    <tr>
                    {
                        cols.map((col: string, index: number) => {
                            return (
                                <th key={col}>{friendlyColNames[index]}</th>
                            )
                        })
                    }
                    </tr>
                </tfoot>
            </table>
            <div style={{ height: '200px' }}>
                <div className='container'>
                    <Pagination
                        moviesPerPage={moviesPerPage}
                        totalMovies={moviesList.length}
                        paginate={paginate}
                        currPage={currPageNum}
                    />
                </div>
            </div>
        </>
    )
}
