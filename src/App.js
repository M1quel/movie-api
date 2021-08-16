import { Router } from '@reach/router';
import { useState } from 'react';
import './App.scss';
import Moviegrid from './components/movieGrid/MovieGrid';
import Searchbar from "./components/searchbar/Searchbar";
import Singlemovie from './components/singleMovie/Singlemovie';

function App() {
  var [movies, setMovies] = useState([])
  
  Notification.requestPermission(function(status) {
    console.log("Notification permission status: ", status)
  })
  function displayNotification () {
    console.log("den kommer hertil")
    if(Notification.permission === "granted") {
      navigator.serviceWorker.getRegistration().then(function (reg) {
        reg.showNotification("hej")
      })
    }
  }

  return (
    <>
      <button onClick={() => {console.log("Det her virker")}}>Notification</button>
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
