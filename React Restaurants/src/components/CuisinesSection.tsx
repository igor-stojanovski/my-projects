import CuisineButton from "./CuisineButton";
import classes from "../styles/cuisinesSection.module.css";
import { useRestaurantContext } from "../context/RestaurantsContext";

export default function CuisinesSection() {
  const { restaurants } = useRestaurantContext();

  const uniqueCuisinesSet = new Set();

  restaurants.forEach((restaurant) =>
    uniqueCuisinesSet.add(restaurant.restauranttype)
  );

  const uniqueCuisinesArray = Array.from(uniqueCuisinesSet);

  return (
    <section className="dividerSectionBorderBottom ">
      <h2 className="title">Cuisines</h2>
      <div className={classes.wrapperCuisinesButtons}>
        {uniqueCuisinesArray.map((cuisine) => (
          <CuisineButton key={cuisine as string} text={cuisine as string} />
        ))}
      </div>
    </section>
  );
}
