import React from 'react'
import { useState, useEffect } from 'react'
import MovieCard from "./MovieCard";
import './App.css'
import SearchIcon from './search.svg'

// API KEY = 
const apiKey = import.meta.env.VITE_API_KEY;
const API_URL = `http://www.omdbapi.com?apikey=${apiKey}`

const App = () => {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const res = await fetch(`${API_URL}&s=${title}`) 
    const data = await res.json();
    setMovies(data.Search);
    console.log(data)
  }

  const handleTitleClick = () => {
    setSearchTerm('')
    searchMovies("star wars")

  }


  useEffect(() => {
    searchMovies("star wars")
  }, []);

  // console.log(movies)
  return (
    <div className='app'>
      <h1 className='cursor' onClick={handleTitleClick}>MovieFindr</h1>

      <div className='search'>
        <input placeholder='Search for movies' value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value)}}  onKeyDown={(e) => {
          if (e.key === 'Enter') {
            searchMovies(searchTerm);
          }
        }}/>

        <img src={SearchIcon} alt='search' onClick={() => searchMovies(searchTerm)}/>
       
      </div>

      {
        movies?.length > 0 ? (
          <div className='container'>

            {
              movies.map( (movie) => (
               <MovieCard movie={movie} key={movie.imdbID}/>
              ))
            }
            
          </div>

        ) : (
          <div className='empty'>
            <h2>No Movies Found</h2>
          </div>
        )

      }



    </div>
  )
}

export default App
