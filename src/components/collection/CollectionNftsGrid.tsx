"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import EmptyList from "../commons/EmptyList";
import TreeNftGrid from "../profile/TreeNftGrid";
import CardSkeleton from "../commons/CardSkeleton";
import { getAssetListFromShyft } from "@/_actions/shyft.action";
import { Button } from "../ui/button";
type Props = {
  collection: string;
  addresses: (string | null)[];
};
const CollectionNftsGrid: React.FC<Props> = ({ collection, addresses }) => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ["get-collection-nfts", collection],
    queryFn: async () => getAssetListFromShyft(addresses, page),
  });
  return (
    <div>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[...Array(10)].map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : !data || data?.length === 0 ? (
        <EmptyList />
      ) : (
        <>
          <TreeNftGrid data={data} hideAction />
          <Button onClick={() => setPage((prev) => prev + 1)}>Load More</Button>
        </>
      )}
    </div>
  );
};

export default CollectionNftsGrid;
