import { Restaurant } from "../context/RestaurantsContext";

export function reviewRating(restaurant: Restaurant) {
  const reviewRating =
    (restaurant.reviewsList || []).reduce((acc, currRestaurant) => {
      return acc + currRestaurant.stars;
    }, 0) / restaurant.reviews;

  return reviewRating;
}
