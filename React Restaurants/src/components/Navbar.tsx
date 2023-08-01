import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <ul className="flex justify-between font-bold text-3xl uppercase dividerSectionBorderBottom">
        <li>
          <Link to={"/"}>Restaurants</Link>
        </li>
        <li>
          <Link to={"/favorites"}>
            <i className="fa-solid fa-heart text-red-600"></i>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
