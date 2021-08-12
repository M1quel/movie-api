import React from 'react';
import { Link } from "@reach/router";
import "./MovieItem.scss";
export default function Movieitem({movie}) {

    return (
        <article className="movieItem">
            <img src={movie.Poster} alt="" />
            <div className="movieItem__contentWrapper">
                <Link to={`/singleMovie/${movie.imdbID}`} className="movieItem__title">{movie.Title}</Link>
                <p className="movieItem__year">{movie.Year}</p>
            </div>
        </article>
    )
}
