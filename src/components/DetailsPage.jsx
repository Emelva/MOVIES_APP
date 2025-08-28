import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Review from "./Review";

export default function DetailsPage(){
    const { id } = useParams();
    
    const [movieDetails, setMovieDetails] = useState(null);
    

    console.log("DetailsPage param id:", id);

    const fetchMovieDetails = async () => {
        try{
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
                    accept: "application/json",
                },
            });
            if(!res.ok){
                console.log('nothing here');
                throw new Error('HTTP Error!', res.status);
            }
            const data = await res.json();
            setMovieDetails(data);
        }catch (e){
            console.error('Error loading page', e)
        }
    }
    
    useEffect(() => {
        fetchMovieDetails();
    }, [id]);

    return (
        <div className="m-5 lg:flex">
            <div>
                {movieDetails ? (
                    <div className="grid lg:grid-cols-2 text-white">
                        <img
                            src={movieDetails.poster_path ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}` : '/H4.png'}
                            alt={movieDetails.title} className="rounded-lg w-"
                        />
                        <div className="p-2">
                            
                            <h1 className="text-bold font-bold">{movieDetails.title}</h1>
                            <div className="flex lg:space-x-8 space-x-2 mb-7 lg:ml-30">
                                <p className="border-r-2 px-5">Viewer Rating: {movieDetails.vote_average ? movieDetails.vote_average.toFixed(1) : 'N/A'}</p>
                                <p className="border-r-2 px-5">{movieDetails.release_date.split('-')[0]}</p>
                                <p className="px-5">{movieDetails.adult === 'true' ? "18+" : "16+" }</p>
                            </div>
                            <p>OVERVIEW</p>
                            <p className="text-xl mb-15 tracking-wide">{movieDetails.overview}</p>

                            <div className="lg:mt-20">
                                {movieDetails && <Review movieId={movieDetails.id} />}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-white p-4">Loading...</div>
                )}
            </div>
            
        </div>
    )
}