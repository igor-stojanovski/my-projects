import { createContext, useContext } from "react";

export interface Restaurant {
  reviews: number;
  parkinglot: boolean;
  phone: string;
  image: string;
  restauranttype: string;
  businessname: string;
  address: string;
  slug: string;
  email: string;
  id: string;
  reviewsList: ReviewsList[];
}

export interface ReviewsList {
  id: number;
  author: string;
  comment: string;
  stars: number;
}

export type StateType = {
  restaurants: Restaurant[];
  favorites: Restaurant[];
  toggleFavorites(restaurant: Restaurant): void;
};

export const RestaurantContext = createContext({} as StateType);

export const useRestaurantContext = () => useContext(RestaurantContext);
