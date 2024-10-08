"use server";

import prisma from "@/lib/db";

export async function getProjectsAction() {
  return prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      Collection: {
        where: {
          publickey: {
            not: null,
          },
          image: { not: null },
        },
        select: {
          id: true,
        },
      },
    },
  });
}

export async function getProjectByIdAction(id: string) {
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      Collection: {
        where: {
          publickey: {
            not: null,
          },
          image: { not: null },
        },
        select: {
          id: true,
        },
      },
    },
  });

  if (!project) {
    return null;
  }

  const nfts = await prisma.nftMetadata.findMany({
    where: {
      collectionId: {
        in: project?.Collection.map((collection) => collection.id),
      },
      assetId: {
        not: null,
      },
      address: {
        not: null,
      },
    },
    select: {
      address: true,
    },
  });

  // const nftMetadata = await getAssetListFromShyft(
  //   nfts.map((nft) => nft.address!)
  // );

  // const sumValue = nftMetadata.reduce((acc, nft) => {
  //   return (acc += Number(nft.attributes?.current_estimated_value) || 0);
  // }, 0);

  return {
    ...project,
    nftCount: nfts.length,
    nfts: nfts.map((nft) => nft.address),
  };
}
