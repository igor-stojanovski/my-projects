import { useRestaurantContext } from "../context/RestaurantsContext";
import RestaurantCard from "./RestaurantCard";

export default function AllRestaurants() {
  const { restaurants } = useRestaurantContext();

  return (
    <section className="dividerSectionBorderBottom">
      <h2 className="title">All Restaurants</h2>
      <div className="containerRestaurants">
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={`all-restaurants-${restaurant.id}`}
            {...restaurant}
          />
        ))}
      </div>
    </section>
  );
}
