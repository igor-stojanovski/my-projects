import { useRestaurantContext } from "../context/RestaurantsContext";
import RestaurantCard from "./RestaurantCard";
import { reviewRating } from "../helperFunctions/reviewRating";

export default function PopularRestaurants() {
  const { restaurants } = useRestaurantContext();

  let popularRestaurants = restaurants
    .slice()
    .sort(
      (restaurantA, restaurantB) =>
        reviewRating(restaurantB) - reviewRating(restaurantA)
    )
    .filter((restaurant) => restaurant.reviews);

  if (popularRestaurants.length < 10) {
    const fillArrayUpToTenRestaurants = restaurants
      .filter((restaurant) => !restaurant.reviews)
      .slice(0, 10 - popularRestaurants.length);

    popularRestaurants = popularRestaurants.concat(fillArrayUpToTenRestaurants);
  }

  return (
    <section className="dividerSectionBorderBottom">
      <h2 className="title">our most popular restaurants</h2>
      <div className="containerRestaurants">
        {popularRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} {...restaurant} />
        ))}
      </div>
    </section>
  );
}
