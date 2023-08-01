import { Link } from "react-router-dom";

type Props = {
  text: string;
};

export default function CuisineButton({ text }: Props) {
  return (
    <Link to={`/cuisines/${text}`} className="cuisine">
      {text}
    </Link>
  );
}
