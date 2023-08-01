import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Components/Navbar";
import ArtistsList from "./Components/ArtistsList";
import ArtistPage from "./Components/ArtistPage";
import AlbumPage from "./Components/AlbumPage";
import ErrorPage from "./Components/ErrorPage";
import artists from "../db";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-12 ">
            <Routes>
              <Route path={"/"} element={<ArtistsList artists={artists} />} />
              <Route
                path={"/artist/:id"}
                element={<ArtistPage artists={artists} />}
              />
              <Route
                path={"/artist/:id/:albumId"}
                element={<AlbumPage artists={artists} />}
              />
              <Route path={"*"} element={<ErrorPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
