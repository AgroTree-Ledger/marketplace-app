"use client";

import React from "react";
import { AsyncImage } from "loadable-image";
import { Loader2 } from "lucide-react";
import { transformIrysUrl } from "@/lib/utils";

type Props = {
  src: string;
};
const NftImage: React.FC<Props> = ({ src }) => {
  return (
    <AsyncImage
      src={transformIrysUrl(src)}
      loader={
        <div className="flex justify-center items-center bg-white/10">
          <Loader2 className="size-5 animate-spin stroke-white/50" />
        </div>
      }
      alt={"collection image"}
      style={{ width: "100%", height: "100%" }}
      className="rounded-2xl aspect-square object-cover"
    />
  );
};

export default NftImage;
