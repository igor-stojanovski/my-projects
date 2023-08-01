import { Bike } from "./Types";

interface CardProps {
  bike: Bike;
}

export default function Card({ bike: { image, name, price } }: CardProps) {
  return (
    <div className="card-bike">
      <div className="img-container">
        <img src={`/img/${image}.png`} alt="" />
      </div>
      <div className="content-container">
        <h3 className="h5">{name}</h3>
        <p>{price}$</p>
      </div>
    </div>
  );
}
