import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Restaurant,
  ReviewsList,
  useRestaurantContext,
} from "../context/RestaurantsContext";
import { reviewRating } from "../helperFunctions/reviewRating";
import classes from "../styles/restaurantDetailPage.module.css";
import Review from "../components/Review";

export default function RestaurantDetailPage() {
  const { restaurants } = useRestaurantContext();

  const { id } = useParams();

  const [formData, setFormData] = useState({
    id: new Date().valueOf(),
    author: "",
    comment: "",
    stars: 1,
  } as ReviewsList);

  const searchedRestaurant = restaurants.find(
    (restaurant) => restaurant.id === id
  );

  function handleChange(
    e: React.ChangeEvent<HTMLFormElement | HTMLInputElement>
  ) {
    const isKeyStars = e.currentTarget.name === "stars";

    const key = e.currentTarget.name;
    const value = e.currentTarget.value;

    setFormData({
      ...formData,
      [key]: isKeyStars ? +value : value,
    });
  }

  const SubmitReview = () => {
    fetch(`http://localhost:5001/restaurants/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...searchedRestaurant,
        reviews: searchedRestaurant!.reviews + 1,
        reviewsList: [...searchedRestaurant!.reviewsList, formData],
      } as Restaurant),
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  return (
    <div className="container">
      <h2 className="title">{searchedRestaurant?.businessname}</h2>

      <div className={`${classes.wrapperRestaurant} bg-gray-300`}>
        <img
          src={searchedRestaurant?.image}
          alt={searchedRestaurant?.businessname}
        />
        <div className="restaurantDetailsContent">
          {searchedRestaurant?.reviews ? (
            <>
              <p>Rating - {reviewRating(searchedRestaurant!)}</p>
              <p>Rased on {searchedRestaurant.reviews} reviews</p>
            </>
          ) : null}
          <p>Phone: {searchedRestaurant?.phone}</p>
          <p>Email: {searchedRestaurant?.email}</p>
          <p>Address: {searchedRestaurant?.address}</p>
          <p>
            {searchedRestaurant?.parkinglot
              ? "We have a parking waiting for you."
              : "Unfortunately we do not offer a parking at this time."}
          </p>
        </div>
      </div>

      {searchedRestaurant?.reviews ? (
        <h2 className="title my-5">Reviews</h2>
      ) : null}
      <div className="wrapperReviews">
        {(searchedRestaurant?.reviewsList || []).map((review) => (
          <Review key={`review${review.id}`} {...review} />
        ))}
      </div>

      <h2 className="title">Review Form</h2>
      <form
        className={`${classes.reviewForm} dividerSectionBorderBottom`}
        onSubmit={() => {
          SubmitReview();
        }}
      >
        <div className="wrapperName">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="author"
            onChange={handleChange}
            value={formData.author}
          />
        </div>
        <div className="wrapperComment">
          <label htmlFor="comment">Comment</label>
          <input
            type="text"
            name="comment"
            onChange={handleChange}
            value={formData.comment}
          />
        </div>
        <div className="wrapperStars">
          <label htmlFor="stars">Stars</label>
          <input
            type="range"
            name="stars"
            min={0}
            max={5}
            className={classes.range}
            onChange={handleChange}
            value={formData.stars}
          />
        </div>
        <button type="submit">Leave a review</button>
      </form>
    </div>
  );
}
