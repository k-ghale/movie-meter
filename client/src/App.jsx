import React, { useState, useEffect } from 'react'
import Search from './components/search'

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;


const url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const [movieList, setMovieList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {

    setIsLoading (true);
    setErrorMessage("");

    try {

      const response = await fetch (url, options);

      if (!response.ok){
        throw new Error("Failed to fetch the data");
      }

      const data = await response.json();

      if (data.Respose == 'False'){
        setErrorMessage("Error loading movie");
        setMovieList([]);
        return;
      }

      setMovieList(data.results)

    } 
    catch (error) {
      console.error(error);
      setErrorMessage('error fetching movies please try again later')
      
    }

    finally{
      setIsLoading(false);
    }
  }

  useEffect(()=>{
    fetchMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />
      <div className='wrapper'>
        <header>
        
          <h1>
            Rate <span className='text-gradient'>Movies</span> As You Feel 
          </h1>

          <h2 className='text-center text-gray-500'>
            Your go-to place for discovering, rating, and sharing your favorite movies.
          </h2>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <h1 className='white'>{searchTerm}</h1>
        </header>
        
        <section className='all-movies'>
        <h2>
          All Movies
        </h2>
        {isLoading ? (
          <p className='text-white'> Loading..</p>
        ): errorMessage ? (
          <p className='text-white'>{errorMessage}</p>
        ):
        <ul>
          {movieList.map((movie) =>(
            <p key={movie.id} className='text-white'>
              {movie.title}
            </p>
          ))}
        </ul>
        }
        </section>
      </div>
    </main>
  )
}

export default App