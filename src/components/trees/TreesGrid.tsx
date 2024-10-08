import { NftMetadataDbType } from "@/types/Metadata.type";
import React from "react";
import TreeCard from "./TreeCard";

type Props = {
  data: NftMetadataDbType[];
};
const TreesGrid: React.FC<Props> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {data.map((tree) => (
        <TreeCard key={tree.id} data={tree} />
      ))}
    </div>
  );
};

export default TreesGrid;
