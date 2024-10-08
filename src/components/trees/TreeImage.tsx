"use client";
import React from "react";
import NftImage from "./NftImage";
type Props = {
  src: string | undefined;
  lat: string;
  lon: string;
};
const TreeImage: React.FC<Props> = ({ src, lat, lon }) => {
  if (!src) {
    return null;
  }
  return (
    <div className="relative rounded-2xl bg-primary/30 border">
      <NftImage src={src} />

      <div className="absolute bottom-0 left-0 right-0  bg-black/70 text-white w-full backdrop-blur-sm text-sm rounded-b-2xl">
        <div className="w-full flex justify-between py-3 px-5">
          <div>
            <h3 className="text-muted-foreground text-xs">Latitude:</h3>
            <span>{lat}</span>
          </div>
          <div>
            <h3 className="text-muted-foreground text-xs">Longitude:</h3>
            <span>{lon}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeImage;
