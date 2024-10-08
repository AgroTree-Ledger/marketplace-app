"use server";

import { getAgroTreeManagerConfigAddress } from "@/lib/contracts/marketplace.contract";
import prisma from "@/lib/db";
import { redis } from "@/lib/redis";
import { getUmiServer } from "@/lib/umi";
import { convertDasApiAssetToTreeNftType } from "@/lib/utils";
import { PaginationType } from "@/types/Pagination.type";
import { TreeNftType } from "@/types/TreeNft.type";
import { DasApiAssetList } from "@metaplex-foundation/digital-asset-standard-api";
import { publicKey } from "@metaplex-foundation/umi";

export async function getTreeNftAction(
  assetId: string
): Promise<TreeNftType | null> {
  // delay for 1 second

  let nft: TreeNftType | null = await redis.get(`nft:${assetId}`);
  if (!nft) {
    const umi = await getUmiServer();
    // const asset = await getass
    const asset = await umi.rpc.getAsset(publicKey(assetId));
    nft = convertDasApiAssetToTreeNftType(asset);
    await redis.set(`nft:${assetId}`, nft, {
      ex: 60, // expire in 60 seconds
    });
  }
  return nft;
}

export async function getTopTreeAction() {
  const trees = await prisma.nftMetadata.findMany({
    where: {
      address: {
        not: null,
      },
    },
    take: 12,
    orderBy: {
      createdAt: "desc",
    },
  });
  return trees || [];
}

export async function getTreesByOwnerAction(
  address: string,
  page = 1,
  limit = 30
): Promise<PaginationType<TreeNftType>> {
  try {
    // delay for 1 second
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // let assests: {
    //   items: TreeNftType[];
    //   total: number;
    //   limit: number;
    // } | null = await redis.get(`assets:${address}`);
    // if (!assests) {
    const umi = await getUmiServer();
    const [agroTreeManagerConfigAddress] = getAgroTreeManagerConfigAddress();

    const rpcAssetList: DasApiAssetList = await umi.rpc.searchAssets({
      owner: publicKey(address),
      compressed: true,
      page,
      limit,
      sortBy: {
        sortBy: "recent_action",
        sortDirection: "desc",
      },
      creator: publicKey(agroTreeManagerConfigAddress),
    });

    const result = rpcAssetList.items.map<TreeNftType>((item) =>
      convertDasApiAssetToTreeNftType(item)
    );
    const assests = {
      items: result,
      total: rpcAssetList.total,
      limit: rpcAssetList.limit,
    };

    //   await redis.set(`assets:${address}`, assests, {
    //     ex: 60, // expire in 60 seconds
    //   });
    // }
    return assests;
  } catch (error) {
    console.error("getTreesByOwnerAction", error);
    return {
      items: [],
      total: 0,
      limit: 0,
    };
  }
}

export async function getTreeNftTransactions(id: string) {
  // delay for 1 second
  const result = await prisma.marketTransaction.findMany({
    where: {
      assetId: id,
    },
  });
  return result || [];
}
