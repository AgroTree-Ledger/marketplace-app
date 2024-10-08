"use server";

import { auth } from "@/auth";
import {
  getCompressedListingAddress,
  getMarketplaceListingNft,
  getMarketplaceListingNftBySeller,
  makeBuyNftInstruction,
  makeListingNftInstruction,
  makeUnlistNftInstruction,
} from "@/lib/contracts/marketplace.contract";
import prisma from "@/lib/db";
import { redis } from "@/lib/redis";
import { CompressedListingType } from "@/types/Contract.type";
import { PublicKey } from "@solana/web3.js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function unlistTreeNftAction(assetId: string): Promise<{
  transaction: string | null;
  success: boolean;
  data: {
    merkleTree: string | null;
  };
}> {
  const session = await auth();

  if (!session || !session.user.id) {
    redirect("/");
  }

  const creator = session.user.id.toString();

  const {
    transaction,
    success,
    data: { merkleTree },
  } = await makeUnlistNftInstruction({
    authority: new PublicKey(creator),
    assetId: new PublicKey(assetId),
  });

  return {
    success,
    transaction,
    data: {
      merkleTree,
    },
  };
}

export async function getMarketplateListingNftBySellerAction(
  seller: string,
  limit = 10,
  page = 1
) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // let response: CompressedListingType[] | null = await redis.get(
    //   `listing:${seller}`
    // );
    // if (!response) {
    const result = await getMarketplaceListingNftBySeller({
      seller: new PublicKey(seller),
      limit,
      page,
    });
    const response = result.map<CompressedListingType>((item) => ({
      publicKey: item.publicKey.toString(),
      account: {
        seller: item.account.seller.toString(),
        merkleTree: item.account.merkleTree.toString(),
        assetId: item.account.assetId.toString(),
        price: item.account.price.toString(),
        bump: item.account.bump,
      },
    }));
    //   await redis.set(`listing:${seller}`, response, {
    //     ex: 10, // expire in 60 seconds
    //   });
    // }

    return response;
  } catch (error) {
    console.error("getMarketplateListingNftBySellerAction", error);
    return [];
  }
}

export async function getTopListingTree(limit = 10, page = 1) {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    // let response: CompressedListingType[] | null = await redis.get(
    //   `top-market`
    // );

    // if (!response) {
    const result = await getMarketplaceListingNft({
      limit,
      page,
    });

    const response = result.map<CompressedListingType>((item) => ({
      publicKey: item.publicKey.toString(),
      account: {
        seller: item.account.seller.toString(),
        merkleTree: item.account.merkleTree.toString(),
        assetId: item.account.assetId.toString(),
        price: item.account.price.toString(),
        bump: item.account.bump,
      },
    }));

    //   await redis.set(`top-market`, response, {
    //     ex: 60, // expire in 3*60 seconds
    //   });
    // }

    return response;
  } catch (error) {
    console.error("getTopListingTree", error);
    return [];
  }
}

export async function buyTreeNftAction(
  assetId: string,
  seller: string
): Promise<{
  transaction: string | null;
  success: boolean;
  data: {
    merkleTree: string | null;
  };
}> {
  const session = await auth();

  if (!session || !session.user.id) {
    redirect("/");
  }

  const creator = session.user.id.toString();

  const {
    transaction,
    success,
    data: { merkleTree },
  } = await makeBuyNftInstruction({
    authority: new PublicKey(creator),
    assetId: new PublicKey(assetId),
    seller: new PublicKey(seller),
  });

  return {
    success,
    transaction,
    data: {
      merkleTree,
    },
  };
}

export async function sellTreeNftAction(
  assetId: string,
  price: number | bigint
): Promise<{
  transaction: string | null;
  success: boolean;
  data: {
    merkleTree: string | null;
  };
}> {
  const session = await auth();

  if (!session || !session.user.id) {
    redirect("/");
  }

  const creator = session.user.id.toString();

  const {
    transaction,
    success,
    data: { merkleTree },
  } = await makeListingNftInstruction({
    authority: new PublicKey(creator),
    assetId: new PublicKey(assetId),
    price,
  });

  return {
    success,
    transaction,
    data: {
      merkleTree,
    },
  };
}

export async function syncAfterSellTreeNftAction(
  merkleTree: string,
  assetId: string,
  price: number | bigint,
  tx: string
) {
  const session = await auth();

  if (!session || !session.user.id) {
    redirect("/");
  }

  const creator = session.user.id.toString();

  const [listingAddress] = getCompressedListingAddress(
    new PublicKey(creator),
    new PublicKey(merkleTree),
    new PublicKey(assetId)
  );

  await redis.del(`assets:${creator}`);
  await redis.del(`listing:${creator}`);
  await prisma.marketTransaction.create({
    data: {
      tx,
      pda: listingAddress.toString(),
      type: "LIST",
      userId: creator,
      price: price.toString(),
      assetId: assetId.toString(),
      merkleTree: merkleTree.toString(),
    },
  });

  revalidatePath("/profile/[slug]", "page");
  revalidatePath("/tree/[address]", "page");
  return true;
}

export async function syncAfterUnlistTreeNftAction(
  merkleTree: string,
  assetId: string,
  price: number | bigint,
  tx: string
) {
  const session = await auth();

  if (!session || !session.user.id) {
    redirect("/");
  }

  const creator = session.user.id.toString();

  // const umi = await getUmiServer();

  // const assetWithProof = await getAssetWithProof(umi, publicKey(assetId));
  // const { program } = getMarketplaceProgram();
  const [listingAddress] = getCompressedListingAddress(
    new PublicKey(creator),
    new PublicKey(merkleTree),
    new PublicKey(assetId)
  );

  // const listingAccount = await program.account.compressedListing.fetch(
  //   listingAddress
  // );
  await redis.del(`assets:${creator}`);
  await redis.del(`listing:${creator}`);
  await prisma.marketTransaction.create({
    data: {
      tx,
      pda: listingAddress.toString(),
      type: "UNLIST",
      userId: creator,
      price: price.toString(),
      assetId: assetId.toString(),
      merkleTree: merkleTree.toString(),
    },
  });
  revalidatePath("/profile/[slug]", "page");
  return true;
}

export async function syncAfterBuyTreeNftAction(
  merkleTree: string,
  assetId: string,
  price: number | bigint,
  tx: string
) {
  const session = await auth();

  if (!session || !session.user.id) {
    redirect("/");
  }

  const creator = session.user.id.toString();

  // const umi = await getUmiServer();

  // const assetWithProof = await getAssetWithProof(umi, publicKey(assetId));
  // const { program } = getMarketplaceProgram();
  const [listingAddress] = getCompressedListingAddress(
    new PublicKey(creator),
    new PublicKey(merkleTree),
    new PublicKey(assetId)
  );

  // const listingAccount = await program.account.compressedListing.fetch(
  //   listingAddress
  // );
  await redis.del(`assets:${creator}`);
  await prisma.marketTransaction.create({
    data: {
      tx,
      pda: listingAddress.toString(),
      type: "BUY",
      userId: creator,
      price: price.toString(),
      assetId: assetId.toString(),
      merkleTree: merkleTree.toString(),
    },
  });

  revalidatePath("/profile/[slug]", "page");
  return true;
}
