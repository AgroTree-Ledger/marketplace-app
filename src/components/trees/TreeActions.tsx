"use client";
import React from "react";
import { useAuthProvider } from "../providers/AuthProvider";
import AuthButton from "../auth/AuthButton";
import { TreeNftType } from "@/types/TreeNft.type";
import SellNftButton from "../marketplace/SellNftButton";
import { useQuery } from "@tanstack/react-query";
import { treeNftOnmarketplace } from "@/lib/contracts/marketplace.contract";
import BuyNftButton from "../marketplace/BuyNftButton";

type Props = {
  nft: TreeNftType;
};
const TreeActions: React.FC<Props> = ({ nft }) => {
  const { isAuthenticated, session } = useAuthProvider();

  const { data } = useQuery({
    queryKey: ["check-nft-on-marketplace", nft.owner, nft.tree, nft.address],
    queryFn: async () => treeNftOnmarketplace(nft.tree, nft.address),
  });

  if (!isAuthenticated) return <AuthButton />;
  if (session && session.user.id === nft.owner) {
    return <SellNftButton item={nft} />;
  }
  if (!!data) {
    return <BuyNftButton item={nft} marketItem={data} />;
  }
  return null;
};

export default TreeActions;
