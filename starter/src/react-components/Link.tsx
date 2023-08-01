import React from "react";

interface Link {
  text: string;
}

export default function Link({ text }: Link) {
  return (
    <li>
      <a href="#">{text}</a>
    </li>
  );
}
