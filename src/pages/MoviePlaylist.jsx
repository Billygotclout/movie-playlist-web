import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MoviePlaylist = () => {
  const [movies, setMovies] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [shareableLink, setShareableLink] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_MOVIEDB_TOKEN}`,
          },
        }
      );

      setMovies(response.data.results);
    };
    fetchMovies();
  }, []);

  const addToPlaylist = (movie) => {
    const isDuplicate = playlist.some((item) => item.id === movie.id);

    if (!isDuplicate) {
      // If the movie is not already in the playlist, add it
      setPlaylist([...playlist, movie]);
    } else {
      console.log("Movie already exists in the playlist.");
    }
  };
  const handleDelete = (id) => {
    const updatedPlaylist = playlist.filter((item) => item.id !== id);
    setPlaylist(updatedPlaylist);
  };
  const generateLink = async () => {
    const playlistJSON = JSON.stringify(playlist);
    const encodedPlaylist = encodeURIComponent(playlistJSON);
    const link = `${window.location.origin}/playlist?data=${encodedPlaylist}`;

    // const shortenedLink = await axios.post(
    //   "https://t.ly/api/v1/link/shorten",
    //   {
    //     long_url:
    //       "https://movie-playlist-web.vercel.app/playlist?data=[{%22adult%22:false,%22backdrop_path%22:%22/pRmF6VBsRnvWCbLB9P80UvZFMyK.jpg%22,%22genre_ids%22:[10749,35],%22id%22:1014590,%22original_language%22:%22en%22,%22original_title%22:%22Upgraded%22,%22overview%22:%22Ana%20is%20an%20ambitious%20intern%20dreaming%20of%20a%20career%20in%20the%20art%20world%20while%20trying%20to%20impress%20her%20demanding%20boss%20Claire.%20When%20she%27s%20upgraded%20to%20first%20class%20on%20a%20work%20trip,%20she%20meets%20handsome%20Will,%20who%20mistakes%20Ana%20for%20her%20boss%E2%80%93%20a%20white%20lie%20that%20sets%20off%20a%20glamorous%20chain%20of%20events,%20romance%20and%20opportunity,%20until%20her%20fib%20threatens%20to%20surface.%22,%22popularity%22:388.489,%22poster_path%22:%22/9xn7y63VIpUsIVzSP9fYrqJHyl9.jpg%22,%22release_date%22:%222024-02-07%22,%22title%22:%22Upgraded%22,%22video%22:false,%22vote_average%22:7.402,%22vote_count%22:376}]",
    //   },
    //   {
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${import.meta.env.VITE_BITLY_ACCESS_TOKEN}`,
    //     },
    //   }
    // );
    // console.log(link);
    // console.log(shortenedLink);
    setShareableLink(link);
    // navigate(`/playlist?data=${encodedPlaylist}`);
  };
  return (
    <div>
      <h1>Movie Playlist</h1>

      <div className="movies">
        {movies.map((movie) => (
          <span className="movie" key={movie.id}>
            <h2>{movie.title}</h2>
            <button
              style={{ marginBottom: "3rem" }}
              onClick={() => addToPlaylist(movie)}
            >
              Add to Playlist
            </button>
          </span>
        ))}
      </div>
      <div className="playlist">
        <h2>Your playlist items</h2>
        {playlist.map((movie) => (
          <div className="movie" key={movie.id}>
            <h2>{movie.title}</h2>
            <button onClick={() => handleDelete(movie.id)}>Remove</button>
          </div>
        ))}
      </div>
      <button onClick={generateLink}>Generate Shareable Link</button>
      {shareableLink && (
        <div>
          <h3>Shareable Link:</h3>
          <a href={shareableLink} target="_blank" rel="noopener noreferrer">
            {shareableLink}
          </a>
        </div>
      )}
    </div>
  );
};

export default MoviePlaylist;
