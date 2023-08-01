import React, { useEffect, useState } from "react";
import { Restaurant, RestaurantContext, StateType } from "./RestaurantsContext";

type RestaurantProviderType = {
  children: React.ReactNode;
};

export default function RestaurantProvider({
  children,
}: RestaurantProviderType) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [favorites, setFavorites] = useState<Restaurant[]>([]);

  function toggleFavorites(restaurant: Restaurant) {
    const isFavoriteRestaurant = favorites.findIndex(
      (res) => res.id === restaurant.id
    );

    if (isFavoriteRestaurant === -1) {
      setFavorites([restaurant, ...favorites]);
    } else {
      setFavorites(favorites.filter((fav) => fav.id !== restaurant.id));
    }
  }

  useEffect(() => {
    fetch("http://localhost:5001/restaurants")
      .then((res) => res.json())
      .then((data) => {
        setRestaurants(data);
      });
    const localStorageFavoritesString = localStorage.getItem("favorites");
    const localStorageArray = localStorageFavoritesString
      ? JSON.parse(localStorageFavoritesString)
      : [];

    setFavorites(localStorageArray);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const stateValue: StateType = {
    restaurants,
    favorites,
    toggleFavorites,
  };

  return (
    <RestaurantContext.Provider value={stateValue}>
      {children}
    </RestaurantContext.Provider>
  );
}
