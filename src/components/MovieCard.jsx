import React from 'react';
import { Link } from 'react-router-dom';
import noPhoto from '../assets/no-photo.png';

const MovieCard = ({ movies, favorites, handleFavoriteClicks }) => {
  // Check if movie is already in the favorites
  const isFavorite = (movie) => {
    return favorites.some((fav) => fav.imdbID === movie.imdbID);
  };

  return (
    <div className="movie-grid  grid grid-cols-1 md:grid-cols-3 gap-14 ">
      {movies.map((movie, index) => (
        <div key={index} className="movie-card container mx-auto flex flex-col border-2 justify-around border-gray-500 rounded-3xl items-center shaddow-2xl shaddow-black  overflow-hidden bg-white hover:scale-105 transition-all">
          <Link to={`/movie/${movie.imdbID}`} className='w-full hover:bg-white mt-10 cursor-pointer' style={{width:"75%"}}>
            {/* <img src={movie.Poster} alt={movie.Title} className=' h-full w-full mx-auto' /> */}
          <img 
            src={movie.Poster !== "N/A" ? movie.Poster : noPhoto} 
            alt={movie.Title} 
            className="h-full w-full mx-auto" 
          />

          </Link>
          <div className="movie-info flex flex-col gap-5 justify-between w-full items-center 
         py-3 mb-5">
            <h3 className='font-bold'>{movie.Title}</h3>

            {/* Conditional rendering for favorite buttons */}
            <div className="flex  justify-around w-full align-center">
            <Link to={`/movie/${movie.imdbID}`} className='text-black hover:text-sky-700  hover:bg-black transition-all py-2 px-5 border-2 rounded-3xl bg-white cursor-pointer '>
                MoreDetails
          </Link>
          {isFavorite(movie) ? (
              <button
                onClick={() => handleFavoriteClicks(movie)} // Call remove function
                className="py-2 px-5 text-center cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className='hover:fill-red-600 transition-all' width={"20px"} viewBox="0 0 448 512"><path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>
              </button>
            ) : (
              <button
                onClick={() => handleFavoriteClicks(movie)} // Call add function
                className="  p-2 text-center  cursor-pointer"
              >
         <svg xmlns="http://www.w3.org/2000/svg" width={"20px"} className='hover:fill-yellow-500 transition-all'  viewBox="0 0 384 512"><path d="M0 48C0 21.5 21.5 0 48 0l0 48 0 393.4 130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4 336 48 48 48 48 0 336 0c26.5 0 48 21.5 48 48l0 440c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488L0 48z"/></svg>
              </button>
            )}
            </div>
 
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieCard;
