import React from "react";
import ArtistItem, { Artist } from "./ArtistItem";

type Props = {
  artists: Artist[];
};

export default function ArtistsList({ artists }: Props) {
  return (
    <div className="ArtistsList">
      <h2>Browse the artists</h2>
      {artists.map((artist) => (
        <ArtistItem key={artist.id} {...artist} />
      ))}
    </div>
  );
}
