import React from 'react';
import Spinner from '../Spinner';
import "./MovieGrid.scss";
import Movieitem from './MovieItem';

export default function Moviegrid(props) {
    
    var isThereNextPage = Math.ceil((props.totalMovies.totalMovies / 10) - (props.pageState.page)) >= 1;
    var currentPage = props.pageState.page
    var totalPages = Math.ceil(props.totalMovies.totalMovies / 10)

    function nextPage () {
        props.pageState.setPage(props.pageState.page+1)
    }
    function prevPage () {
        props.pageState.setPage(props.pageState.page-1)
    }

    return (
        <>
        <main className="movieGrid">

            {props.movies?.length > 0 ? props.movies?.map((movie, i) => {
                return <Movieitem movie={movie} key={i}/>
            }) : props.mode === "search" ? <Spinner/> : <p className="noResults">Søg for at finde resultater</p>}

            
        </main>
        {props.movies ? 
            <div className="pagination">
                { currentPage > 1 ? 
                <button className="pagination__prev pagination__btn" onClick={prevPage}>Prev page</button> : 
                <button className="pagination__prev pagination__btn pagination__btn--inactive">Prev page</button>}

                <p className="pagination__pageNum">{currentPage} / {totalPages}</p>

                {isThereNextPage ? <button className="pagination__next pagination__btn" onClick={nextPage}>Next page</button> : 
                <button className="pagination__next pagination__btn pagination__btn--inactive">Next page</button>}
                
            </div> 
        : null}
        </>
    )
}
