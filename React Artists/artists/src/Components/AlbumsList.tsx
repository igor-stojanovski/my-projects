import React from "react";
import { Album } from "./AlbumPage";
import { Link } from "react-router-dom";
import { Artist } from "./ArtistItem";

type Props = {
  albums: Album[];
  artist: Artist;
};

export default function AlbumsList({ albums, artist }: Props) {
  return (
    <>
      {albums.map((album) => {
        return (
          <Link
            key={album.albumId}
            to={`/artist/${artist.id}/${album.albumId}`}
            className="album-child"
          >
            <img src={`/images/albums/${album.cover}.jpg`} alt="Image" />
          </Link>
        );
      })}
    </>
  );
}
