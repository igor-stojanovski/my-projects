import { ReviewsList } from "../context/RestaurantsContext";

export default function Review({ author, comment, stars }: ReviewsList) {
  return (
    <div className="review p-5 bg-gray-300 rounded-lg mb-3">
      <p>
        <span className="font-bold">Author:</span>
        {author}
      </p>
      <p>
        <span className="font-bold">Message:</span>
        {comment}
      </p>
      <p>
        <span className="font-bold">Stars: </span>
        {stars}
      </p>
    </div>
  );
}
