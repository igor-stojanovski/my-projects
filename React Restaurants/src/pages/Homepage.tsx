import SurpriseRestaurant from "../components/SurpriseRestaurant";
import PopularRestaurants from "../components/PopularRestaurants";
import CuisinesSection from "../components/CuisinesSection";
import AllRestaurants from "../components/AllRestaurants";

export default function Homepage() {
  return (
    <main>
      <SurpriseRestaurant />
      <PopularRestaurants />
      <CuisinesSection />
      <AllRestaurants />
    </main>
  );
}
