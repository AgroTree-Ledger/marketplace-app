"use server";

import prisma from "@/lib/db";

export async function getCollectionByAddressAction(address: string) {
  const collection = await prisma.collection.findFirst({
    where: {
      publickey: address,
      image: { not: null },
    },
    include: {
      NftMetadata: {
        select: {
          assetId: true,
          address: true,
        },
        orderBy: {
          assetId: "asc",
        },
        where: {
          address: { not: null },
        },
      },
    },
  });
  return collection;
}

export async function getCollectionsAction() {
  const collections = await prisma.collection.findMany({
    where: {
      publickey: { not: null },
      image: { not: null },
    },
    include: {
      NftMetadata: {
        select: {
          id: true,
        },
        where: {
          address: { not: null },
        },
      },
    },
  });
  return collections;
}

export async function getCollectionsOfProjectAction(projectId: string) {
  const collections = await prisma.collection.findMany({
    where: {
      publickey: { not: null },
      image: { not: null },
      projectId,
    },
    include: {
      NftMetadata: {
        select: {
          id: true,
        },
        where: {
          address: { not: null },
        },
      },
    },
  });
  return collections;
}
