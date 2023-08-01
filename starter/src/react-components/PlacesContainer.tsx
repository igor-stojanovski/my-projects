import React, { useEffect, useState } from "react";
import Places, { PlacesProps } from "./Places";

export default function PlacesContainer() {
  const [places, setPlaces] = useState<PlacesProps[]>([]);

  useEffect(() => {
    fetch("http://localhost:5001/places")
      .then((res) => res.json())
      .then((data: PlacesProps[]) => setPlaces(data));
  }, []);

  return (
    <div className="PlacesContainer">
      {places.map((placeData) => {
        return (
          <Places
            key={placeData.id}
            id={placeData.id}
            img={placeData.img}
            desc={placeData.desc}
            place={placeData.place}
          />
        );
      })}
    </div>
  );
}
