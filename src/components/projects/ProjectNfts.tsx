import { TreeNftType } from "@/types/TreeNft.type";
import React from "react";
import EmptyList from "../commons/EmptyList";
import TreeNftGrid from "../profile/TreeNftGrid";
type Props = {
  nfts: TreeNftType[];
};
const ProjectNfts: React.FC<Props> = ({ nfts }) => {
  if (nfts?.length === 0) return <EmptyList />;
  return <TreeNftGrid data={nfts} hideAction />;
};

export default ProjectNfts;
