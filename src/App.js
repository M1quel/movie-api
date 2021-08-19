import { Router } from '@reach/router';
import { useEffect, useState } from 'react';
import './App.scss';
import Moviegrid from './components/movieGrid/MovieGrid';
import Searchbar from "./components/searchbar/Searchbar";
import displayNotification from './components/helpers/displayNotification';
import Singlemovie from './components/singleMovie/Singlemovie';


function App() {

  // var [db, setDB] = useState(undefined)
  // var request = window.indexedDB.open("test-db-47");

  // request.onsuccess(function(event) {
  //   console.log(event.target.result)
  // })
/*   var dbPromise = window.indexedDB.open('test-db1', 1, function(upgradeDB) {
    //Making an object store
    if (!upgradeDB.objectStoreNames.contains('rating')) {
      var ratingDB = upgradeDB.createObjectStore('rating', {keyPath: "movieID"});
      ratingDB.createIndex("movieID", "movieID", {unique: true});
      ratingDB.createIndex("rating", "rating", {unique: false});
    }

  }) */
  // useEffect(function () {
  //   if (!('indexedDB' in window)) {
  //     console.log('This browser doesn\'t support IndexedDB');
  //     return;
  //   }
    
  // }, [setDB])

/*   useEffect(function () {
    if(dbPromise) {
      dbPromise().then(function(db) {
        var tx = db.transaction('rating', 'readwrite');
        var store = tx.objectStore('rating');
        var item = {
          movieID: "jiang",
          rating: 3
        };
        store.add(item);
        return tx.complete;
      }).then(function() {
        console.log('added item to the store os!');
      });
    }
  }, [dbPromise]) */

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
