import React from "react";
import TreeNftGrid from "../profile/TreeNftGrid";
import NoData from "../commons/NoData";
import EmptyList from "../commons/EmptyList";
import { LayoutPanelTop } from "lucide-react";
import { getAssetByOwnerFromShyft } from "@/_actions/shyft.action";
import CardSkeleton from "../commons/CardSkeleton";
type Props = {
  address: string;
};
const TreesOwnByUser: React.FC<Props> = async ({ address }) => {
  // const data = await getTreesByOwnerAction(address);
  const { items: trees } = await getAssetByOwnerFromShyft(address);

  if (!trees) {
    return <NoData />;
  }
  return (
    <div className="container mx-auto py-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <LayoutPanelTop className="size-5 mr-2" /> Trees owned
        </h2>
      </div>
      {trees.length === 0 ? <EmptyList /> : <TreeNftGrid data={trees} />}
    </div>
  );
};

export const TreesOwnByUserSkeleton = () => {
  return (
    <div className="container mx-auto py-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <LayoutPanelTop className="size-5 mr-2" /> Trees owned
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {[...Array(10)].map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default TreesOwnByUser;
