import classes from "../styles/surpriseSection.module.css";
import { Link } from "react-router-dom";
import { useRestaurantContext } from "../context/RestaurantsContext";

export default function SurpriseRestaurant() {
  const { restaurants } = useRestaurantContext();

  const NUMBER_OF_RESTAURANTS = restaurants.length - 1;

  function getRandomNumberRestaurant(max: number) {
    return Math.floor(Math.random() * max);
  }

  const randomRestaurant =
    restaurants[getRandomNumberRestaurant(NUMBER_OF_RESTAURANTS)];

  return (
    <section className={classes.SurpriseSection}>
      <h2 className="title">Don't know what to eat?</h2>
      <Link to={`/restaurant/${randomRestaurant?.id}`}>Surprise me!</Link>
    </section>
  );
}
