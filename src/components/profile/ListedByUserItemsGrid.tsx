import React from "react";
import NoData from "../commons/NoData";
import { getMarketplateListingNftBySellerAction } from "@/_actions/marketplace.actions";
import MarketplaceItemCard from "../marketplace/MarketplaceItemCard";
import { TransactionEnum } from "@/types/Contract.type";
type Props = {
  address: string;
};
const ListedByUserItemsGrid: React.FC<Props> = async ({ address }) => {
  const trees = await getMarketplateListingNftBySellerAction(address);
  if (!trees) {
    return <NoData />;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {trees.map((tree) => (
        <MarketplaceItemCard
          key={tree.publicKey.toString()}
          item={tree}
          type={TransactionEnum.UNLIST}
        />
      ))}
    </div>
  );
};

export const ListedByUserItemsGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {[...Array(10)].map((_, index) => (
        <div key={index}>
          <div className="aspect-square bg-muted-foreground/15 rounded-xl" />
          <div className="space-y-2">
            <div className="py-4">
              <h3 className="text-white font-semibold mb-2">
                <div className="h-8 bg-muted-foreground/15" />
              </h3>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <div className="h-4 bg-muted-foreground/15" />
                </div>
                <div>
                  <div className="h-4 bg-muted-foreground/15" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListedByUserItemsGrid;
