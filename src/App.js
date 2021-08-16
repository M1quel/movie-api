import { Router } from '@reach/router';
import { useState } from 'react';
import './App.scss';
import Moviegrid from './components/movieGrid/MovieGrid';
import Searchbar from "./components/searchbar/Searchbar";
import displayNotification from './components/helpers/displayNotification';
import Singlemovie from './components/singleMovie/Singlemovie';

function App() {
  Notification.requestPermission(function(status) {
    console.log("Notification permission status: ", status)
  })
  var [movies, setMovies] = useState([])

  return (
    <>
      <button onClick={() => displayNotification("Du grim")}>Notification</button>
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
