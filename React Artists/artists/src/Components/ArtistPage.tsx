import React from "react";
import { Artist } from "./ArtistItem";
import { useParams } from "react-router-dom";
import AlbumsList from "./AlbumsList";

type Props = {
  artists: Artist[];
};

export default function ArtistPage({ artists }: Props) {
  const { id } = useParams();

  const artist = id ? artists.find((artist) => artist.id === +id) : undefined;

  return (
    <>
      {artist ? (
        <div className="artist-detail">
          <div className="artist-detail-content">
            <img
              className="artist-detail-cover"
              src={`/images/covers/${artist?.cover}.jpg`}
              alt="Image"
            />
            <h3>{artist?.name}</h3>
            <p>{artist?.bio}</p>
            <div className="albums">
              <AlbumsList artist={artist} albums={artist?.albums} />
            </div>
          </div>
        </div>
      ) : (
        <p>No Artist Found</p>
      )}
    </>
  );
}
