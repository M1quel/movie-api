import { navigate } from '@reach/router';
import axios from 'axios';
import React, { useEffect } from 'react';
import "./Searchbar.scss"

export default function Searchbar(state) {
    function submitHandler (event) {
        event.preventDefault()
        state.state([])
        navigate("/search")
        var searchValue = document.querySelector(".search__input").value

        var options = {
            method: 'GET',
            url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
            params: {s: searchValue, page: '1', r: 'json'},
            headers: {
              'x-rapidapi-key': 'cbf0eada93mshda4348a7166d51bp13e11bjsna5929dc3ff1a',
              'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
            }
        };
        axios.request(options).then(function (response) {
            state.state(response.data.Search)
            document.querySelector(".searchCheck").checked = false;
            navigate("/")

        }).catch(function (error) {
            console.error(error);
        });

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
