import { useRestaurantContext } from "../context/RestaurantsContext";
import RestaurantCard from "../components/RestaurantCard";

type Props = {};

export default function FavoritesPage({}: Props) {
  const { favorites } = useRestaurantContext();
  return (
    <div className="container">
      <h2 className="title">Your favorite restaurants</h2>
      <div className="favoriteRestaurants">
        {favorites.map((fav) => (
          <RestaurantCard key={fav.id} {...fav} />
        ))}
      </div>
    </div>
  );
}
