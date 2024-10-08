import React, { Suspense } from "react";
import ListedByUserItemsGrid, {
  ListedByUserItemsGridSkeleton,
} from "./ListedByUserItemsGrid";
import { LayoutPanelTop } from "lucide-react";
type Props = {
  address: string;
};
const ListedByUserSection: React.FC<Props> = async ({ address }) => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <LayoutPanelTop className="size-5 mr-2" />
          Your NFTs listing ...
        </h2>
        <button className="text-green-500 text-sm">SEE MORE</button>
      </div>
      <Suspense fallback={<ListedByUserItemsGridSkeleton />}>
        <ListedByUserItemsGrid address={address} />
      </Suspense>
    </div>
  );
};

export default ListedByUserSection;
