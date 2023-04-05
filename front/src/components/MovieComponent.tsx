
import React from 'react'

export default function MovieComponent(movie : { movieId: any, title: any, year: any, director: any, category: any, rating: any, edited: any, lentTo: any, notes: any }) {
    return (
        <tr>
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
}
