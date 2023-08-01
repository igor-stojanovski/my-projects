import {
  Restaurant,
  useRestaurantContext,
} from "../context/RestaurantsContext";
import { Link } from "react-router-dom";
import classes from "../styles/restaurantCard.module.css";
import { reviewRating } from "../helperFunctions/reviewRating";

export default function RestaurantCard(restaurant: Restaurant) {
  const rating = reviewRating(restaurant);

  const { toggleFavorites, favorites } = useRestaurantContext();

  const isFavorite = (restaurant: Restaurant) => {
    return favorites.some((fav) => fav.id === restaurant.id);
  };

  return (
    <Link to={`/restaurant/${restaurant.id}`}>
      <div className={`res ${classes.restaurantCard}`}>
        <picture>
          <img src={restaurant.image} alt="" />
        </picture>
        <div className={classes.resCardContent}>
          <p className={classes.resBusinessName}>{restaurant.businessname}</p>
          <p className={classes.resType}>{restaurant.restauranttype}</p>
          {restaurant.reviews ? (
            <>
              <p>Rating - {rating}</p>
              <p>based on {restaurant.reviewsList.length} reviews</p>
            </>
          ) : null}
        </div>
        <button
          className={classes.btnFavorite}
          onClick={(e) => {
            e.preventDefault();

            toggleFavorites(restaurant);
          }}
        >
          {isFavorite(restaurant) ? (
            <i
              className={`fa-solid fa-heart text-red-600 ${classes.favIcon}`}
            ></i>
          ) : (
            <i
              className={`fa-regular fa-heart text-red-600 ${classes.favIcon}`}
            ></i>
          )}
        </button>
      </div>
    </Link>
  );
}
