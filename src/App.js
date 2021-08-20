import { Router } from '@reach/router';
import { useEffect, useRef, useState } from 'react';
import './App.scss';
import { navigate } from '@reach/router';
import Moviegrid from './components/movieGrid/MovieGrid';
import Searchbar from "./components/searchbar/Searchbar";
import Singlemovie from './components/singleMovie/Singlemovie';
import fetchMovies from './components/helpers/fetch';


function App() {
  const isMounted = useRef(false)
  var [page, setPage] = useState(1);
  console.log(page)
  var [searchValue, setSearchValue] = useState("")
  var [movies, setMovies] = useState(undefined);
  var [totalMovies, setTotalMovies] = useState(0)


  useEffect(function () {
    if(isMounted.current) {
      setMovies(undefined)
      var options = {
        method: 'GET',
        url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
        params: {s: searchValue, page: `${page}`, r: 'json'},
        headers: {
          'x-rapidapi-key': 'cbf0eada93mshda4348a7166d51bp13e11bjsna5929dc3ff1a',
          'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
        }
      };
      navigate("/search")
      fetchMovies(options).then((data) => {
        setMovies(data.Search)
        setTotalMovies(data.totalResults)
        navigate("/")
      })
    } else {
      isMounted.current = true
    }
  }, [page]) //eslint-disable-line

  return (
    <>
      <Searchbar state={setMovies} pageState={{page, setPage}} searchState={setSearchValue} totalMovies={setTotalMovies}/>
      <Router>
        <Moviegrid path="/" totalMovies={{totalMovies, setTotalMovies}} pageState={{page, setPage}} movies={movies} />
        <Moviegrid path="/:mode" totalMovies={{totalMovies, setTotalMovies}} pageState={{page, setPage}} movies={movies}/>

        <Singlemovie path="/singleMovie/:id"/>
      </Router>
    </>
  );
}

export default App;
