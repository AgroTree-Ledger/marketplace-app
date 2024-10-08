import React from "react";
import TreesGrid from "./TreesGrid";
import { getTopTreeAction } from "@/_actions/nfts.actions";
import NoData from "../commons/NoData";

const TopTreeSection = async () => {
  const trees = await getTopTreeAction();
  if (!trees) {
    return <NoData />;
  }
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Top Of Trees:</h2>
        <button className="text-green-500 text-sm">SEE MORE</button>
      </div>
      <TreesGrid data={trees} />
    </div>
  );
};

export default TopTreeSection;
