import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const API_URL = 'https://www.omdbapi.com'; // Ensure this is the correct API URL
const API_KEY = '2c8d0989'; // Replace with your actual API key

function MovieDetail() {
  const { id } = useParams(); // Get the movie ID from the URL parameters
  const [movieDetails, setMovieDetails] = useState(null); // State to store movie details
  const [error, setError] = useState(''); // State to store any errors
  const [loading, setLoading] = useState(true); // State to manage loading status

  // Fetch movie details by movie ID
  const fetchMovieDetails = async (id) => {
    try {
      const response = await fetch(`${API_URL}?i=${id}&apikey=${API_KEY}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.Response === 'True') {
        setMovieDetails(data); // Set the fetched movie details in state
      } else {
        setError(data.Error); // Set error if no movie found
      }
    } catch (error) {
      console.error('Error fetching movie details:', error);
      setError('Failed to fetch movie details.');
    } finally {
      setLoading(false); // Stop loading once the fetch is complete
    }
  };

  // Use useEffect to fetch movie details when component mounts
  useEffect(() => {
    fetchMovieDetails(id);
  }, [id]); 

  // Render loading state or error message if applicable
  if (loading) return <div className="text-white text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  // Render movie details if available
  return (
    <div className="movie-detail grid md:grid-cols-2 grid-cols-1 container mx-auto border-2 border-white rounded-3xl mt-16 ">
      {movieDetails && (
        <>
          <img src={movieDetails.Poster} alt={movieDetails.Title} className="md:w-2/3 mx-auto" />
          <div className="container flex flex-col justify-center text-left md:space-y-4 space-y-2 text-white p-5">
            <h1 className="text-3xl font-bold">{movieDetails.Title}</h1>
            <p><strong className="text-red-700 text-lg">Release Date:</strong> {movieDetails.Released}</p>
            <p><strong className="text-red-700 text-lg">Genre:</strong> {movieDetails.Genre}</p>
            <p><strong className="text-red-700 text-lg">Plot:</strong> {movieDetails.Plot}</p>
            <p><strong className="text-red-700 text-lg">Cast:</strong> {movieDetails.Actors}</p>
            <p><strong className="text-red-700 text-lg">Ratings:</strong></p>
            <ul>
              {movieDetails.Ratings.map((rating) => (
                <li key={rating.Source}>
                  {rating.Source}: {rating.Value}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default MovieDetail;
