import React from "react";
import Link from "./Link";

export default function Footer() {
  return (
    <div className="Footer">
      <ul>
        <Link text="destinations" />
        <Link text="contact" />
        <Link text="stories" />
      </ul>
    </div>
  );
}
