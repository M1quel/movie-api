import { Router } from '@reach/router';
import { useEffect, useState } from 'react';
import './App.scss';
import Moviegrid from './components/movieGrid/MovieGrid';
import Searchbar from "./components/searchbar/Searchbar";
import Singlemovie from './components/singleMovie/Singlemovie';


function App() {

  useEffect(function () {
    Notification.requestPermission(function(status) {
      console.log("Notification permission status: ", status)
    })
  }, [])
  var [movies, setMovies] = useState([])

  return (
    <>
      <Searchbar state={setMovies}/>
      <Router>
        <Moviegrid default path="/" movies={movies}/>
        <Moviegrid path="/:mode" movies={movies}/>

        <Singlemovie path="/singleMovie/:id"/>
      </Router>
    </>
  );
}

export default App;
