import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import MoviePlaylist from "./pages/MoviePlaylist";
import PlaylistPage from "./pages/PlaylistPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MoviePlaylist />} />
      <Route path="/playlist" element={<PlaylistPage />} />
    </Routes>
  );
}

export default App;
