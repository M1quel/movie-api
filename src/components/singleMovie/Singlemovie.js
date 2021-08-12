import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Spinner from '../Spinner';
import "./Singlemovie.scss";

export default function Singlemovie(props) {
    
    var [movie, setMovie] = useState(undefined) 

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
            <section className="movieMain">
                {movie.Plot === "N/A" ? null : <p className="movieMain__description">{movie.Plot}</p>}
                <div className="ratings">
                    <p className="ratings__metascore rating"><span className="score">{movie.Metascore === "N/A" ? "No metascore" : movie.Metascore}</span></p>
                    <p className="ratings__imdbRating rating"><span className="score">{movie.imdbRating === "N/A" ? "No imdbRating" : movie.imdbRating}</span></p>
                </div>
            </section>
        </section>
        
        
    )
}
