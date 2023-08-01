import React from "react";
import { Link, useParams } from "react-router-dom";
import { Album } from "./AlbumPage";

export interface Artist {
  id: number;
  name: string;
  cover: string;
  bio: string;
  albums: Album[];
}

export default function ArtistItem(artist: Artist) {
  return (
    <Link to={`/artist/${artist.id}`}>
      <div className="artist-item">
        <img src={`/images/covers/${artist.cover}.jpg`} alt="Image" />
        <span className="artist-name">{artist.name}</span>
      </div>
    </Link>
  );
}
