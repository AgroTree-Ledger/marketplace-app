"use client";
import { displayPrice, getAttributeValue } from "@/lib/utils";
import React from "react";
import { CompressedListingType, TransactionEnum } from "@/types/Contract.type";
import { useQuery } from "@tanstack/react-query";
import { getTreeNftAction } from "@/_actions/nfts.actions";
import NftImage from "../trees/NftImage";
import Link from "next/link";
import { ScanSearch } from "lucide-react";
import BuyNftButton from "./BuyNftButton";
import SellNftButton from "./SellNftButton";
import UnlistNftButton from "./UnlistNftButton";

type Props = {
  item: CompressedListingType;
  type: TransactionEnum;
};

const MarketplaceItemCard: React.FC<Props> = ({
  item,
  type = TransactionEnum.BUY,
}) => {
  const { data: asset } = useQuery({
    queryKey: ["get-assets", item.account.assetId.toString()],
    queryFn: async () => getTreeNftAction(item.account.assetId.toString()),
  });

  if (!asset) {
    return null;
  }

  return (
    <div className="rounded-lg overflow-hidden">
      <div className="relative max-h-[270px] h-[270px] group">
        {asset?.file?.uri ? <NftImage src={asset.file.uri} /> : null}

        <div className="absolute bottom-2 left-2 bg-black text-green-500 text-xs py-1 px-2 rounded-md font-bold">
          Age: {getAttributeValue(asset, "age")} years
        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0 group-hover:bg-primary group-hover:opacity-50 flex items-center justify-center transition-all duration-500">
          <Link href={`/tree/${item.account.assetId}`}>
            <ScanSearch className="size-10 text-transparent group-hover:text-white group-hover:scale-150 transition-all duration-500 cursor-pointer" />
          </Link>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold mb-2">{asset.metadata.name}</h3>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div>
            <p className="text-gray-400">Floor Price</p>
            <p className="text-white">
              {displayPrice(item.account.price)}{" "}
              <span className="text-muted-foreground">SOL</span>
            </p>
          </div>
          <div>
            <p className="text-gray-400">Quantity</p>
            <p className="text-white">
              {1} <span className="text-muted-foreground">Trees</span>
            </p>
          </div>
        </div>
      </div>
      <div>
        {type === TransactionEnum.BUY ? (
          <BuyNftButton item={asset} marketItem={item} full />
        ) : null}
        {type === TransactionEnum.LIST ? <SellNftButton item={asset} /> : null}
        {type === TransactionEnum.UNLIST ? (
          <UnlistNftButton item={asset} marketItem={item} full />
        ) : null}
      </div>
    </div>
  );
};

export default MarketplaceItemCard;
