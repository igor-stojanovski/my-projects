import React from "react";

type Props = {
  pretitle: string;
  title: string;
  btnText: string;
};

export default function Banner({ pretitle, title, btnText }: Props) {
  return (
    <div className="Banner">
      <div className="banner-content-container">
        <p>{pretitle}</p>
        <h1>{title}</h1>
        <button>{btnText}</button>
      </div>
    </div>
  );
}
