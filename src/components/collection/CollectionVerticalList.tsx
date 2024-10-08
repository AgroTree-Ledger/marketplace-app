import React from "react";
import { getCollectionsAction } from "@/_actions/collection.actions";
import NoData from "../commons/NoData";
import CollectionCarousel from "./CollectionCarousel";
import { AlignStartHorizontal } from "lucide-react";

const CollectionVerticalList = async () => {
  const collections = await getCollectionsAction();

  if (!collections) {
    return <NoData />;
  }
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-muted-foreground flex items-center gap-2">
          <AlignStartHorizontal className="size-5 stroke-foreground" />
          Top collection
        </h2>
      </div>
      <CollectionCarousel collections={collections} />
    </div>
  );
};

export const CollectionVerticalListSkeleton = () => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-col-span-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index}>
            <div className="relative w-full sm:max-w-[290px] h-screen max-h-[260px] rounded-xl overflow-hidden">
              <div className="animate-pulse bg-muted-foreground/20 w-full h-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionVerticalList;
