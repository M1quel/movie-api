import { Router } from '@reach/router';
import { useState } from 'react';
import './App.scss';
import Moviegrid from './components/movieGrid/MovieGrid';
import Searchbar from "./components/searchbar/Searchbar";
import Singlemovie from './components/singleMovie/Singlemovie';

function App() {
  var [movies, setMovies] = useState([])

  function displayNotification (message) {
    if(Notification.permission === "granted") {
      navigator.serviceWorker.getRegistration().then(function (reg) {
        reg.showNotification(message)
      })
    }
  }

  Notification.requestPermission(function(status) {
    console.log("Notification permission status: ", status)
  })
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
