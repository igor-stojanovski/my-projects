import React from "react";
import { Artist } from "./ArtistItem";
import { useParams } from "react-router-dom";

type Props = {
  artists: Artist[];
};

export interface Album {
  albumId: string;
  title: string;
  year: number;
  cover: string;
  price: number;
}

export default function AlbumPage({ artists }: Props) {
  const { id, albumId } = useParams();

  const album = id
    ? artists
        .find((artist) => artist.id === +id)
        ?.albums.find((album) => album.albumId === albumId)
    : undefined;

  return (
    <>
      {album ? (
        <div className="AlbumPage">
          <div className="album-page-content">
            <img src={`/images/albums/${album?.cover}.jpg`} alt="Image" />
            <p>
              <span> Title:</span> {album?.title}
            </p>
            <p>
              <span> Year:</span> {album?.year}
            </p>
            <p>
              <span> Price:</span> {album?.price} $
            </p>
          </div>
        </div>
      ) : (
        <p>No such album found</p>
      )}
    </>
  );
}
