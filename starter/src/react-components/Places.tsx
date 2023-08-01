import React from "react";

export interface PlacesProps {
  place: string;
  desc: string;
  img: string;
  id: number;
}

export default function Places({ place, desc, img }: PlacesProps) {
  return (
    <div className="place" style={{ backgroundImage: `url(${img})` }}>
      <div className="content">
        <h3>{place}</h3>
        <p>{desc}</p>
      </div>
    </div>
  );
}
