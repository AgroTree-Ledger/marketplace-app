import React from "react";
import TopMarketplaceItemsGrid from "./TopMarketplaceItemsGrid";
import { getTopListingTree } from "@/_actions/marketplace.actions";
import NoData from "../commons/NoData";
import EmptyList from "../commons/EmptyList";
import { Skeleton } from "../ui/skeleton";
import { Loader2, StoreIcon } from "lucide-react";
import { unstable_noStore as noStore } from "next/cache";
const TopMarketplaceItemsSection = async () => {
  noStore();
  const trees = await getTopListingTree();
  if (!trees) {
    return <NoData />;
  }
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-muted-foreground flex items-center gap-2">
          <StoreIcon className="size-5 stroke-foreground" />
          On sale
        </h2>
        {trees.length > 0 ? (
          <button className="text-green-500 text-sm">SEE MORE</button>
        ) : null}
      </div>

      {trees.length === 0 ? (
        <EmptyList message={"No items on Market"} />
      ) : (
        <TopMarketplaceItemsGrid trees={trees} />
      )}
    </div>
  );
};

export const TopMarketplaceItemsSectionSkeleton = () => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold flex items-center">
          On sale <Loader2 className="ml-2 animate-spin size-4" />
        </h2>
        <button className="text-green-500 text-sm">SEE MORE</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {[...Array(5)].map((_, index) => (
          <div key={index}>
            <Skeleton className="max-h-[230px] h-[230px] w-full rounded-xl bg-muted-foreground/15" />
            <div className="space-y-2">
              <div className="py-4">
                <h3 className="text-white font-semibold mb-2">
                  <Skeleton className="h-8 w-full bg-muted-foreground/15" />
                </h3>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <Skeleton className="h-4 w-full bg-muted-foreground/15" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-full bg-muted-foreground/15" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopMarketplaceItemsSection;
