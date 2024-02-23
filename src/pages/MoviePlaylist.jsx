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
      console.log(response.data.results);
      setMovies(response.data.results);
    };
    fetchMovies();
  }, []);

  const addToPlaylist = (movie) => {
    const isDuplicate = playlist.some((item) => item.id === movie.id);

    if (!isDuplicate) {
      // If the movie is not already in the playlist, add it
      const { id, poster_path, title, overview } = movie;
      setPlaylist([...playlist, { id, poster_path, title, overview }]);
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

    const shortenedLink = await axios.post(
      "https://t.ly/api/v1/link/shorten",
      {
        long_url: link,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_BITLY_ACCESS_TOKEN}`,
        },
      }
    );
    console.log(link);
    console.log(shortenedLink.data.short_url);
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
          <a
            href={shareableLink}
            target="_blank"
            className=""
            rel="noopener noreferrer"
          >
            {shareableLink}
          </a>
        </div>
      )}
    </div>
  );
};

export default MoviePlaylist;
