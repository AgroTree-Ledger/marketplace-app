"use client";
import { getAttributeValue } from "@/lib/utils";
import { ScanSearch } from "lucide-react";
import React from "react";
import { TreeNftType } from "@/types/TreeNft.type";
import Link from "next/link";
import SellNftButton from "../marketplace/SellNftButton";
import NftImage from "../trees/NftImage";

type Props = {
  data: TreeNftType;
  hideAction?: boolean;
};

const TreeNftCard: React.FC<Props> = ({ data, hideAction }) => {
  return (
    <div className="rounded-lg overflow-hidden">
      <div className="relative max-h-[270px] h-[270px] group">
        {data.file?.uri ? <NftImage src={data.file.uri} /> : null}

        <div className="absolute bottom-2 left-2 bg-black text-green-500 text-xs py-1 px-2 rounded-md font-bold">
          Age: {getAttributeValue(data, "age")}
        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0 group-hover:bg-primary group-hover:opacity-50 flex items-center justify-center transition-all duration-500">
          <Link href={`/tree/${data.address}`}>
            <ScanSearch className="size-10 text-transparent group-hover:text-white group-hover:scale-150 transition-all duration-500 cursor-pointer" />
          </Link>
        </div>
      </div>
      <div className="p-4">
        <Link href={`/tree/${data.address}`}>
          <h3 className="font-semibold mb-2">{data.metadata.name}</h3>
        </Link>
        {data.metadata.description ? (
          <p className="line-clamp-1 text-muted-foreground text-sm">
            {data.metadata.description}...
          </p>
        ) : null}
      </div>
      {!hideAction ? (
        <div>
          <SellNftButton item={data} full />
        </div>
      ) : null}
    </div>
  );
};

export default TreeNftCard;
