import React from "react";

import { Skeleton } from "../ui/skeleton";
import MarketplaceItemCard from "./MarketplaceItemCard";
import { CompressedListingType, TransactionEnum } from "@/types/Contract.type";

type Props = {
  trees: CompressedListingType[];
};

const TopMarketplaceItemsGrid: React.FC<Props> = async ({ trees }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {trees.map((tree) => (
        <MarketplaceItemCard
          key={tree.publicKey.toString()}
          item={tree}
          type={TransactionEnum.BUY}
        />
      ))}
    </div>
  );
};

export const TopMarketplaceItemsGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {[...Array(5)].map((_, index) => (
        <div key={index}>
          <Skeleton className="max-h-[270px] h-[270px] w-full rounded-xl bg-muted-foreground/10" />
          <div className="space-y-2">
            <div className="p-4">
              <h3 className="text-white font-semibold mb-2">
                <Skeleton className="h-8 w-full bg-primary/50" />
              </h3>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <p className="text-gray-400">Floor Price</p>
                  <p className="text-white flex items-center gap-1">
                    <Skeleton className="h-4 w-8 bg-muted-foreground/10" />
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Quantity</p>
                  <p className="text-white flex items-center gap-1">
                    <Skeleton className="h-4 w-8 bg-muted-foreground/10" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopMarketplaceItemsGrid;
