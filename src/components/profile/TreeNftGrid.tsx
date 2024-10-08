import React from "react";
import TreeNftCard from "./TreeNftCard";
import { TreeNftType } from "@/types/TreeNft.type";

type Props = {
  data: TreeNftType[];
  hideAction?: boolean;
};
const TreeNftGrid: React.FC<Props> = ({ data, hideAction }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-6">
      {data.map((tree) => (
        <TreeNftCard
          key={tree.address.toString()}
          data={tree}
          hideAction={hideAction}
        />
      ))}
    </div>
  );
};

export default TreeNftGrid;
