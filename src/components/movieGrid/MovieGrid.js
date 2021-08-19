import React from 'react';
import Spinner from '../Spinner';
import "./MovieGrid.scss";
import Movieitem from './MovieItem';

export default function Moviegrid(props) {
    return (
        <>
        <main className="movieGrid">

            {props.movies?.length > 0 ? props.movies?.map((movie, i) => {
                return <Movieitem movie={movie} key={i}/>
            }) : props.mode === "search" ? <Spinner/> : <p className="noResults">Søg for at finde resultater</p>}

            
        </main>
        {props.movies ? <div className="pagination">
            {props.pageState.page > 1 ? 
            <button className="pagination__prev pagination__btn" onClick={() => {props.pageState.setPage(props.pageState.page-1)}}>Prev page</button> : 
            <button className="pagination__prev pagination__btn pagination__btn--inactive">Prev page</button>}

            <p className="pagination__pageNum">{props.pageState.page} / {Math.ceil(props.totalMovies.totalMovies / 10)}</p>

            {Math.ceil((props.totalMovies.totalMovies / 10) - (props.pageState.page)) >= 1 ? 
            <button className="pagination__next pagination__btn" onClick={() => {props.pageState.setPage(props.pageState.page+1)}}>Next page</button> : 
            <button className="pagination__next pagination__btn pagination__btn--inactive">Next page</button>}
            
        </div> : null}
        </>
    )
}
