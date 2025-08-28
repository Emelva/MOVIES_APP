import { useEffect, useState } from "react"
import Search from "./components/Search"
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appWrite";

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const[errorMessage, setErrorMessage] = useState('');
  const[movieList, setMovieList] = useState([]);
  const[isLoading, setIsLoading] = useState(false);
  const[debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const[trendingMovies, setTrendingMovies] = useState([]);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('')
    try{
      const endpoint = query 
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if(data.Response === 'False'){
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovieList([]);
        return;
      }
      
      setMovieList(data.results || []);

      if(query && data.results.length > 0){
        await updateSearchCount(query, data.results[0]);
      }
      
    }catch (error){
      console.error(`Error fetching movies: ${error}`)
      setErrorMessage('Error fetching movies. Please try again later');
    }
    finally{
      setIsLoading(false);
    }
  }

  const loadTrendingMovies = async () => {
    try{
      const movies = await getTrendingMovies();
      setTrendingMovies(movies)
    }catch (error){
      console.error('Error fetching trending movies', error)
    }
  }
  useEffect(()  => {
    fetchMovies(debouncedSearchTerm)
  }, [debouncedSearchTerm]);

  useEffect(()  => {
    loadTrendingMovies()
  }, []);
  return (
      <>
      <main>
        <div className="pattern">
          <div className="wrapper">
            <header>
              <img src="/hero-img.png" alt="Hero-baner" />
              <h1>Find <span className="text-gradient">Movies </span>You Will Enjoy Without The Hassle</h1>

              <Search searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}/>
            </header>

            {trendingMovies.length > 0 && (
              <section className="trending">
                <h2>Trending Movies</h2>
                <ul>
                  {trendingMovies.map((movie, index) => (
                    <li key={movie.$id}>
                      <p>{index + 1}</p>
                      <img src={movie.posterUrl} alt={movie.title} />
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="all-movies">
              <h2>All Movies</h2>
              {isLoading ? (
                <Spinner />
              ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ): <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
              ))}
              </ul>}
            </section>
          </div>
        </div>
      </main>
    </>
  )
}

export default App


// 0
// : 
// {adult: false, backdrop_path: '/iZLqwEwUViJdSkGVjePGhxYzbDb.jpg', genre_ids: Array(2), id: 755898, original_language: 'en', …}
// 1
// : 
// {adult: false, backdrop_path: '/ZtcGMc204JsNqfjS9lU6udRgpo.jpg', genre_ids: Array(2), id: 911430, original_language: 'en', …}
// 2
// : 
// {adult: false, backdrop_path: '/538U9snNc2fpnOmYXAPUh3zn31H.jpg', genre_ids: Array(3), id: 575265, original_language: 'en', …}
// 3
// : 
// {adult: false, backdrop_path: '/eU7IfdWq8KQy0oNd4kKXS0QUR08.jpg', genre_ids: Array(3), id: 1061474, original_language: 'en', …}
// 4
// : 
// {adult: false, backdrop_path: '/xk0ck8qmYmevisTmphWIDm1g43p.jpg', genre_ids: Array(3), id: 1151334, original_language: 'en', …}
// 5
// : 
// {adult: false, backdrop_path: '/zNriRTr0kWwyaXPzdg1EIxf0BWk.jpg', genre_ids: Array(3), id: 1234821, original_language: 'en', …}
// 6
// : 
// {adult: false, backdrop_path: '/jvpkBenB6hv19WWYVlaiow8zklq.jpg', genre_ids: Array(5), id: 1175942, original_language: 'en', …}
// 7
// : 
// {adult: false, backdrop_path: '/1RgPyOhN4DRs225BGTlHJqCudII.jpg', genre_ids: Array(4), id: 1311031, original_language: 'ja', …}
// 8
// : 
// {adult: false, backdrop_path: '/kYsU56QEcwEr8jAQ6Vm3M8bXTWz.jpg', genre_ids: Array(4), id: 1429739, original_language: 'th', …}
// 9
// : 
// {adult: false, backdrop_path: '/yth78N88nwokepnOe5atwPGfTL1.jpg', genre_ids: Array(3), id: 1382406, original_language: 'zh', …}
// 10
// : 
// {adult: false, backdrop_path: '/lWeaB9S77Os7VHOt8GH5JdfrBX3.jpg', genre_ids: Array(5), id: 1022787, original_language: 'en', …}
// 11
// : 
// {adult: false, backdrop_path: '/u3Cfe21Cmv5cWs5VnFCz15HdfKO.jpg', genre_ids: Array(1), id: 1389158, original_language: 'hi', …}
// 12
// : 
// {adult: false, backdrop_path: '/qEFTuoFIAwrnVn7IsvE8RVt2TK3.jpg', genre_ids: Array(4), id: 1087192, original_language: 'en', …}
// 13
// : 
// {adult: false, backdrop_path: '/ySHUoK4utUOiSfCinw81H1TsV0E.jpg', genre_ids: Array(3), id: 1241470, original_language: 'en', …}
// 14
// : 
// {adult: false, backdrop_path: '/nZsKWhwhUL3Eg88SkIaJjuIZzpN.jpg', genre_ids: Array(3), id: 1319895, original_language: 'en', …}
// 15
// : 
// {adult: false, backdrop_path: '/l3ycQYwWmbz7p8otwbomFDXIEhn.jpg', genre_ids: Array(5), id: 803796, original_language: 'en', …}
// 16
// : 
// {adult: false, backdrop_path: '/kyqM6padQzZ1eYxv84i9smNvZAG.jpg', genre_ids: Array(2), id: 1078605, original_language: 'en', …}
// 17
// : 
// {adult: false, backdrop_path: '/iZztGzckOMByRRQgsFh2yk3udkU.jpg', genre_ids: Array(3), id: 986206, original_language: 'en', …}
// 18
// : 
// {adult: false, backdrop_path: '/2VGfjnT3RpjOKADbwgbmXCFSbH.jpg', genre_ids: Array(2), id: 1443260, original_language: 'en', …}
// 19
// : 
// {adult: false, backdrop_path: '/s94NjfKkcSczZ1FembwmQZwsuwY.jpg', genre_ids: Array(2), id: 617126, original_language: 'en', …}
