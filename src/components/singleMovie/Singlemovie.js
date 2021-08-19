import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Spinner from '../Spinner';
import "./Singlemovie.scss";
import Localbase from 'localbase'
export default function Singlemovie(props) {

    var [movie, setMovie] = useState(undefined) 
    var [userRating, setUserRating] = useState(undefined)
    
    let db = new Localbase("db");
    useEffect (function () {
        db.collection("ratings").doc({ id: props.id }).get().then(document => {
            if(document) {
                setUserRating(document)
                
            } else {
                return
            }
        })
        
    }, [])//eslint-disable-line

    //Sætter den nye rating
    function putUserRating (e) {
        e.preventDefault();
        var form = e.target;
        db.collection("ratings").doc({ id: props.id }).add({
            id: props.id,
            rating: form.selectRating.value,
            description: form.description.value
        });
        setUserRating({
            id: props.id,
            rating: form.selectRating.value,
            description: form.description.value
        })
    }

    //Fjerner rating fra filmen
    function removeRating () {
        db.collection("ratings").doc({ id: props.id }).delete();
        setUserRating(undefined)
    } 

    //Henter data om filmen
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

                <section className="userRating">
                    <h1 className="rating__heading">{userRating ? "Your rating" : "Give it a rating"}</h1>
                    {userRating ? <div className="rating__wrapper">
                        <svg index="1" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" className="svg-inline--fa fa-star fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill={userRating ? userRating.rating >= 1 ? "yellow" : "transparent" : "transparent"} d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>
                        <svg index="2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" className="svg-inline--fa fa-star fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill={userRating ? userRating.rating >= 2 ? "yellow" : "transparent" : "transparent"} d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>
                        <svg index="3" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" className="svg-inline--fa fa-star fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill={userRating ? userRating.rating >= 3 ? "yellow" : "transparent" : "transparent"} d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>
                        <svg index="4" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" className="svg-inline--fa fa-star fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill={userRating ? userRating.rating >= 4 ? "yellow" : "transparent" : "transparent"} d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>
                        <svg index="5" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" className="svg-inline--fa fa-star fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill={userRating ? userRating.rating >= 5 ? "yellow" : "transparent" : "transparent"} d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>
                    </div> : null}
                    <div className="userRatingWrapper">
                        {userRating ? <div className="userRating">
                            <p className="userDescription__p">" {userRating.description ? userRating.description : ""} "</p>
                            <button className="userRatingBTN" onClick={removeRating}>Remove Rating</button>
                        </div> : 
                        <form className="userRatingForm" onSubmit={(e) => {putUserRating(e);}}>
                            {<select className="ratingSelect" name="selectRating" id="selectRating">
                                <option defaultValue value="">Vælg Rating</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>}
                            <textarea className="userDescription__textField" name="description" id="description" placeholder="Descripe your thoughts on the movie"></textarea>
                            <button className="userRatingBTN" type="submit">Submit Rating</button>
                        </form>}
                        
                        
                    </div>
                </section>
            </div>
        </section>
        
        
    )
}
