"use client";
import { displayNumber, transformIrysUrl } from "@/lib/utils";
import { NftMetadataDbType } from "@/types/Metadata.type";
import { Loader2 } from "lucide-react";
import React from "react";
import { AsyncImage } from "loadable-image";

type Props = {
  data: NftMetadataDbType;
};

const TreeCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="rounded-lg overflow-hidden">
      <div className="relative max-h-[270px] h-[270px] ">
        <AsyncImage
          src={transformIrysUrl(data.image)}
          loader={
            <div className="flex justify-center items-center bg-white/10">
              <Loader2 className="size-5 animate-spin stroke-white/50" />
            </div>
          }
          alt={"collection image"}
          style={{ width: "100%", height: "100%" }}
          className="rounded-lg aspect-auto object-cover"
        />

        <div className="absolute bottom-2 left-2 bg-black text-green-500 text-xs py-1 px-2 rounded-md font-bold">
          Age: 11
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold mb-2">{data.name}</h3>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div>
            <p className="text-gray-400">Floor Price</p>
            <p className="text-white">
              {1} <span className="text-muted-foreground">Trees</span>
            </p>
          </div>
          <div>
            <p className="text-gray-400">Quantity</p>
            <p className="text-white">
              {displayNumber(1000)}{" "}
              <span className="text-muted-foreground">Trees</span>
            </p>
          </div>
          <div>
            <p className="text-gray-400">Total Buy</p>
            <p className="text-white">
              {812} <span className="text-muted-foreground">Trees</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeCard;
