import { navigate } from '@reach/router';
import React, { useEffect } from 'react';
import "./Searchbar.scss"
import fetchMovies from '../helpers/fetch';

export default function Searchbar(props) {
    function submitHandler (event) {
        event.preventDefault()
        props.state([])
        navigate("/search")
        var searchValue = document.querySelector(".search__input").value
        props.searchState(searchValue)
        var options = {
            method: 'GET',
            url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
            params: {s: searchValue, page: 1, r: 'json'},
            headers: {
              'x-rapidapi-key': 'cbf0eada93mshda4348a7166d51bp13e11bjsna5929dc3ff1a',
              'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
            }
        };
        fetchMovies(options).then((data) => {
            props.state(data.Search)
            props.totalMovies(data.totalResults)
            props.pageState.setPage(1)
            navigate("/")
        })
    }
    useEffect(function () {
        document.querySelector(".searchCheck").checked = true;
    }, [])
    return (
        <section className="header">
            <input type="checkbox" name="searchCheck" id="searchCheck" className="searchCheck" />
            <form onSubmit={(event) => {submitHandler(event)}} className="search">
                <input className="search__input" type="text" />
                <button className="search__submit" type="submit">&#x1F50D;</button>
            </form>
            <label htmlFor="searchCheck" className="header__expandSearch"><i className="fas fa-chevron-down"></i></label>
        </section>
    )
}
