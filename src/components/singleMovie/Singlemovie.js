import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Spinner from '../Spinner';
import "./Singlemovie.scss";
export default function Singlemovie(props) {

    var [movie, setMovie] = useState(undefined) 
    var [userRating, setUserRating] = useState(undefined)

    var starRef = useRef();
    var ratingRef = useRef();
    useEffect(function () {
        if(!movie) return
        var rating = ratingRef.current;
        var ratingSelect = rating.querySelector(".ratingSelect")
        ratingSelect.addEventListener("change", function () {
            setRating(ratingSelect.value)
        })
    }, [movie])

    function setRating (index) {
        var starWrapper = starRef.current;
        var stars = starWrapper.querySelectorAll("svg")
        stars.forEach(star => {
            star.querySelector("path").style.fill = "transparent"

            if(star.getAttribute("index") <= index) {
                star.querySelector("path").style.fill = "yellow"
            }
        })
    } 

    useEffect(function () {
        var options = {
            method: 'GET',
            url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
            params: {i: props.id, r: 'json'},
            headers: {
              'x-rapidapi-key': 'cbf0eada93mshda4348a7166d51bp13e11bjsna5929dc3ff1a',
              'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (response) {
                setMovie(response.data);
          }).catch(function (error) {
              console.error(error);
          });
    }, [props.id, setMovie])

    return (
        
        movie === undefined ? <Spinner/> : <section className="singleMovie">
        
            <section className="infoSection">
                <h1 className="infoSection__title">{movie.Title}</h1>
                <p className="infoSection__director">By: {movie.Director}</p>
                <p className="infoSection__writers">Written by: {movie.Writer}</p>
            </section>
            <div className="posterSection">
                <img className="posterSection__poster" src={movie.Poster === "N/A" ? "/images/image-regular.svg" : movie.Poster} alt="" />
                <div className="posterSection__times">
                    <p className="posterSection__runtime">{movie.Runtime}</p>
                    <p className="posterSection__releasedate">{movie.Released}</p>
                </div>
            </div>
            <div className="singleMovie__content">
                <section className="movieMain">
                    {movie.Plot === "N/A" ? null : <p className="movieMain__description">{movie.Plot}</p>}
                    <div className="ratings">
                        <p className="ratings__metascore rating"><span className="score">{movie.Metascore === "N/A" ? "No metascore" : movie.Metascore}</span></p>
                        <p className="ratings__imdbRating rating"><span className="score">{movie.imdbRating === "N/A" ? "No imdbRating" : movie.imdbRating}</span></p>
                    </div>
                </section>

                <section className="rating">
                    {"" ? <h1 className="rating__heading">Din tidligere rating</h1> : <h1 className="rating__heading">Giv en rating</h1>}
                    <div ref={starRef} className="rating__wrapper">
                        <svg index="1" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" class="svg-inline--fa fa-star fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>
                        <svg index="2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" class="svg-inline--fa fa-star fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>
                        <svg index="3" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" class="svg-inline--fa fa-star fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>
                        <svg index="4" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" class="svg-inline--fa fa-star fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>
                        <svg index="5" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" class="svg-inline--fa fa-star fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>
                    </div>
                    <div ref={ratingRef}>
                        <select className="ratingSelect" name="selectRating" id="selectRating">
                            <option selected value="">Vælg Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </section>
            </div>
        </section>
        
        
    )
}
