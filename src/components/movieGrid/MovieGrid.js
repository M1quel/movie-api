import React from 'react';
import Spinner from '../Spinner';
import "./MovieGrid.scss";
import Movieitem from './MovieItem';

export default function Moviegrid(props) {
    return (
        <main className="movieGrid">

            {props.movies?.length > 0 ? props.movies?.map(movie => {
                return <Movieitem movie={movie} key={movie.imdbID}/>
            }) : props.mode === "search" ? <Spinner/> : <p className="noResults">Søg for at finde resultater</p>}
        </main>
    )
}
