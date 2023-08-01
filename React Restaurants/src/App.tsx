import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import FavoritesPage from "./pages/FavoritesPage";
import RestaurantDetailPage from "./pages/RestaurantDetailPage";
import CuisinesDetail from "./pages/CuisinesDetail";
import Footer from "./components/Footer";
import ErrorPage from "./pages/ErrorPage";
import RestaurantProvider from "./context/RestaurantProvider";

const App = () => {
  return (
    <RestaurantProvider>
      <div className="container">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path={"/"} element={<Homepage />} />
            <Route path={"/cuisines/:cuisine"} element={<CuisinesDetail />} />
            <Route path={"/favorites"} element={<FavoritesPage />} />
            <Route
              path={"/restaurant/:id"}
              element={<RestaurantDetailPage />}
            />
            <Route path={"*"} element={<ErrorPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </RestaurantProvider>
  );
};

export default App;
