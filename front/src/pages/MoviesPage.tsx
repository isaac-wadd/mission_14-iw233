
import React, { useState, useEffect } from 'react'
import MovieComponent from '../components/MovieComponent'
import Pagination from '../components/Pagination'

export default function MoviesPage () {

// using 'useState' for list of movies, current page number (for movies list) and count of movies per page
    const [moviesList, setMoviesList] = useState([])
    const [currPageNum, setPageNum] = useState(1)
    const [moviesPerPage] = useState(10)
    const [loading, setLoading] = useState(true)
    const [sortCol, setSortCol] = useState('movieId')

    const cols = [ 'title', 'year', 'director', 'category', 'rating', 'edited', 'lentTo', 'notes' ]
    const friendlyNames = [ 'Title', 'Year', 'Director', 'Category', 'Rating', 'Edited', 'Lent To', 'Notes' ]

    useEffect(() => {
        const fetchMovieData = async () => {
            const res = await fetch('https://localhost:4000/api/Movies')
            let tmpData = await res.json()
            tmpData = [...tmpData].sort((a, b) => a[sortCol] > b[sortCol] ? 1 : -1 )
            setMoviesList(tmpData)
            setLoading(false)
        }
        fetchMovieData()
    })

    const firstMovieInd = (currPageNum - 1) * moviesPerPage
    const lastMovieInd = firstMovieInd + moviesPerPage
    const currMovies = moviesList.slice(firstMovieInd, lastMovieInd)

    function paginate(pageNum: number) { setPageNum(pageNum) }
    function sortData(col: string) { setSortCol(col) }

    if (loading) {
        return (
            <h3>
                <em>loading...</em>
            </h3>
        )
    }

    return (
        <>
            <h3 className='display-5 text-center'>All Movies</h3>
            <br />
            <table className='table table-striped table-bordered text-start'>
                <thead>
                    <tr>
                    {
                        cols.map((col: string, index: number) => {
                            return (
                                <th key={col} onClick={() => sortData(col)}>{friendlyNames[index]}</th>
                            )
                        })
                    }
                    </tr>
                </thead>
                <tbody>
                {
                    currMovies.map((movie: any) => {
                        return <MovieComponent
                            key={movie.movieId}
                            movieId={movie.movieId}
                            title={movie.title}
                            year={movie.year}
                            director={movie.director}
                            category={movie.category}
                            rating={movie.rating}
                            edited={movie.edited}
                            lentTo={movie.lentTo}
                            notes={movie.notes}
                        />
                    })
                }
                </tbody>
                <tfoot>
                    <tr>
                        <th>Title</th>
                        <th>Year</th>
                        <th>Director</th>
                        <th>Category</th>
                        <th>Rating</th>
                        <th>Edited</th>
                        <th>Lent To</th>
                        <th>Notes</th>
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
