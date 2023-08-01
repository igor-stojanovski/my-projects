import React from "react";

interface DetailsBlockProps {
  pretitle: string;
  title: string;
  body: string;
  img: string;
}

export default function DetailsBlock({
  pretitle,
  title,
  body,
  img,
}: DetailsBlockProps) {
  return (
    <div className="Details-Block">
      <div className="details-block-container">
        <div className="content">
          <p className="details-pretitle">{pretitle}</p>
          <h2>{title}</h2>
          <p>{body}</p>
        </div>
        <div className="image">
          <img src={img} alt="" />
        </div>
      </div>
    </div>
  );
}
