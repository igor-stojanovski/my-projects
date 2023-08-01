import React from "react";

type Props = {
  title: string;
  linksList: string[];
};

export default function FooterList({ title, linksList }: Props) {
  return (
    <>
      <h3>{title}</h3>
      <ul>
        {linksList.map((linkName, i) => (
          <li key={i}>
            <a href="#">{linkName}</a>
          </li>
        ))}
      </ul>
    </>
  );
}
