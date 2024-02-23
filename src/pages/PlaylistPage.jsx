import React, { useEffect, useState } from "react";

const PlaylistPage = () => {
  const [playlistData, setPlaylistData] = useState([]);

  useEffect(() => {
    // Parse playlist data from URL
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get("data");
    if (data) {
      try {
        const decodedData = decodeURIComponent(data);
        const playlist = JSON.parse(decodedData);

        setPlaylistData(playlist);
      } catch (error) {
        console.error("Error parsing playlist data:", error);
      }
    }
  }, []);

  return (
    <div>
      <h1>My Playlist</h1>
      <ul>
        {playlistData.map((movie) => (
          <div key={movie.id}>
            <li>{movie.title}</li>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt=""
            />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistPage;
