import { useParams } from "react-router-dom";
import { useRestaurantContext } from "../context/RestaurantsContext";
import RestaurantCard from "../components/RestaurantCard";

export default function CuisinesDetail() {
  const { restaurants } = useRestaurantContext();
  const { cuisine } = useParams();

  const thisCuisineRestaurants = restaurants.filter((restaurant) => {
    return restaurant.restauranttype === cuisine;
  });

  return (
    <div className="dividerSectionBorderBottom">
      <h2 className="title">{cuisine} Restaurants</h2>
      <div className="containerRestaurants">
        {thisCuisineRestaurants.map((restaurant) => (
          <RestaurantCard key={`cuisine${restaurant.id}`} {...restaurant} />
        ))}
      </div>
    </div>
  );
}
