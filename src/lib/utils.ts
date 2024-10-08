import { Nft } from "@/types/shyft.type";
import { TreeNftType } from "@/types/TreeNft.type";
import { BN } from "@coral-xyz/anchor";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import { DasApiAsset } from "@metaplex-foundation/digital-asset-standard-api";
import {
  AccountMeta,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const IS_PRODUCTION = process.env.NODE_ENV === "production";

export const transformIrysUrl = (url: string) => {
  return url.replace("arweave.net/", "gateway.irys.xyz/");
};

export const buildTransaction = async (
  publicClient: Connection,
  instructions: TransactionInstruction[],
  payer: PublicKey | string
) => {
  const { blockhash } = await publicClient.getLatestBlockhash({
    commitment: "finalized",
  });

  const messageV0 = new TransactionMessage({
    payerKey: new PublicKey(payer),
    recentBlockhash: blockhash,
    instructions,
  }).compileToV0Message();
  return new VersionedTransaction(messageV0);
};

export async function buildTransactionWithSigner(
  publicClient: Connection,
  instructions: TransactionInstruction[],
  payer: PublicKey | string,
  signers: Keypair[]
): Promise<VersionedTransaction> {
  const { blockhash } = await publicClient.getLatestBlockhash({
    commitment: "finalized",
  });

  const messageV0 = new TransactionMessage({
    payerKey: new PublicKey(payer),
    recentBlockhash: blockhash,
    instructions,
  }).compileToV0Message();

  const tx = new VersionedTransaction(messageV0);

  signers.forEach((s) => tx.sign([s]));

  return tx;
}

export const transformToVersionedTransaction = (message: string) => {
  const tx = Buffer.from(message, "base64");
  return VersionedTransaction.deserialize(tx);
};

export const truncateAddress = (address: string | null) => {
  if (!address) return "";
  return address.slice(0, 6) + "..." + address.slice(-4);
};

export const formatDateToDisplay = (date: Date) => {
  return date.toLocaleDateString();
};

export const getExplorerLink = (address: string) => {
  return `https://explorer.solana.com/address/${address}?cluster=devnet`;
};

export const getExplorerTxLink = (tx: string) => {
  return `https://explorer.solana.com/tx/${tx}?cluster=devnet`;
};

export const getShyftTranslatorLink = (address: string) => {
  return `https://translator.shyft.to/address/${address}?cluster=devnet`;
};

export type ValidDepthSizePair =
  | { maxDepth: 3; maxBufferSize: 8 }
  | { maxDepth: 5; maxBufferSize: 8 }
  | { maxDepth: 14; maxBufferSize: 64 }
  | { maxDepth: 14; maxBufferSize: 256 }
  | { maxDepth: 14; maxBufferSize: 1024 }
  | { maxDepth: 14; maxBufferSize: 2048 }
  | { maxDepth: 15; maxBufferSize: 64 }
  | { maxDepth: 16; maxBufferSize: 64 }
  | { maxDepth: 17; maxBufferSize: 64 }
  | { maxDepth: 18; maxBufferSize: 64 }
  | { maxDepth: 19; maxBufferSize: 64 }
  | { maxDepth: 20; maxBufferSize: 64 }
  | { maxDepth: 20; maxBufferSize: 256 }
  | { maxDepth: 20; maxBufferSize: 1024 }
  | { maxDepth: 20; maxBufferSize: 2048 }
  | { maxDepth: 24; maxBufferSize: 64 }
  | { maxDepth: 24; maxBufferSize: 256 }
  | { maxDepth: 24; maxBufferSize: 512 }
  | { maxDepth: 24; maxBufferSize: 1024 }
  | { maxDepth: 24; maxBufferSize: 2048 }
  | { maxDepth: 26; maxBufferSize: 512 }
  | { maxDepth: 26; maxBufferSize: 1024 }
  | { maxDepth: 26; maxBufferSize: 2048 }
  | { maxDepth: 30; maxBufferSize: 512 }
  | { maxDepth: 30; maxBufferSize: 1024 }
  | { maxDepth: 30; maxBufferSize: 2048 };

const allPairs: number[][] = [
  [3, 8],
  [5, 8],
  [14, 64],
  [14, 256],
  [14, 1024],
  [14, 2048],
  [15, 64],
  [16, 64],
  [17, 64],
  [18, 64],
  [19, 64],
  [20, 64],
  [20, 256],
  [20, 1024],
  [20, 2048],
  [24, 64],
  [24, 256],
  [24, 512],
  [24, 1024],
  [24, 2048],
  [26, 512],
  [26, 1024],
  [26, 2048],
  [30, 512],
  [30, 1024],
  [30, 2048],
];

export const ALL_DEPTH_SIZE_PAIRS: ValidDepthSizePair[] = allPairs.map(
  (pair) => {
    return {
      maxDepth: pair[0],
      maxBufferSize: pair[1],
    } as ValidDepthSizePair;
  }
);

const allDepthSizes = ALL_DEPTH_SIZE_PAIRS.flatMap(
  (pair) => pair.maxDepth
).filter((item, pos, self) => self.indexOf(item) == pos);

const defaultDepthPair = {
  maxDepth: 3,
  maxBufferSize: 8,
};

export const getTreeOptions = (treeNodes: number) => {
  let maxDepth = defaultDepthPair.maxDepth;

  if (treeNodes <= 0)
    return {
      maxDepth,
      maxBufferSize: defaultDepthPair.maxBufferSize,
      canopyDepth: 0,
    };

  for (let i = 0; i <= allDepthSizes.length; i++) {
    if (Math.pow(2, allDepthSizes[i]) >= treeNodes) {
      maxDepth = allDepthSizes[i];
      break;
    }
  }

  const maxBufferSize =
    ALL_DEPTH_SIZE_PAIRS.filter((pair) => pair.maxDepth == maxDepth)?.[0]
      ?.maxBufferSize ?? defaultDepthPair.maxBufferSize;

  const maxCanopyDepth = maxDepth >= 20 ? 17 : maxDepth;

  return {
    maxDepth,
    maxBufferSize,
    canopyDepth: maxCanopyDepth - 3 >= 0 ? maxCanopyDepth - 3 : 0,
  };
};

export function displayNumber(input: number) {
  return input.toFixed(3).toLocaleString();
}

export function displayPrice(lamports: BN | string) {
  const price = new BN(lamports);
  return displayNumber(Number(price) / LAMPORTS_PER_SOL);
}

export function convertDasApiAssetToTreeNftType(
  item: DasApiAsset
): TreeNftType {
  // const collectionRaw = item.grouping.find(
  //   (group) => group.group_key === "collection"
  // );
  return {
    address: item.id.toString(),
    owner: item.ownership.owner.toString(),
    // interface: item.interface.toString(),
    metadata: {
      name: item.content.metadata.name,
      symbol: item.content.metadata.symbol,
      token_standard: item.content.metadata.token_standard,
      description: item.content.metadata.description,
      attributes: item.content.metadata.attributes?.map((attr) => ({
        trait_type: attr.trait_type,
        value: attr.value,
      })),
    },
    uri: item.content.json_uri,
    file:
      item.content.files && item.content.files?.length > 0
        ? { uri: item.content.files[0].uri, mime: item.content.files[0].mime }
        : { uri: "", mime: "" },
    authorities: item.authorities.map((item) => ({
      address: item.address.toString(),
      scopes: item.scopes.map((i) => i.toString()),
    })),
    isCompressed: item.compression.compressed,
    // data_hash: item.compression.data_hash.toString(),
    // creator_hash: item.compression.creator_hash.toString(),
    // asset_hash: item.compression.asset_hash.toString(),
    tree: item.compression.tree.toString(),
    leaf_id: item.compression.leaf_id,
    // collection: {
    //   address: collectionRaw?.group_value || "",
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //   metadata: (collectionRaw as any)?.collection_metadata || {},
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //   verified: (collectionRaw as any)?.verified || false,
    // },
    // creator: item.creators.map((cr) => ({
    //   address: cr.address.toString(),
    //   share: cr.share,
    //   verified: cr.verified,
    // })),
  };
}

export function convertShyftApiAssetToTreeNftType(item: Nft): TreeNftType {
  return {
    address: item.mint,
    owner: item.owner,
    metadata: {
      name: item.name,
      symbol: item.symbol,
      description: item.description,
      attributes: item.attributes_array,
    },
    uri: item.metadata_uri,
    file: {
      uri: item.image_uri,
      mime: "image/png",
    },
    authorities: [
      {
        address: item.owner,
        scopes: [],
      },
    ],
    isCompressed: item.is_compressed,
    tree: item.merkle_tree,
    collection: {
      address: item.collection.address,
      verified: item.collection.verified,
    },
    attributes: item.attributes,
  };
}

export function getAttributeValue(data: TreeNftType, traitType: string) {
  return (
    data.metadata.attributes
      ?.find((attr) => attr.trait_type === traitType)
      ?.value?.toString() || "N/A"
  );
}

export function convertTraitType(traitType: string | undefined): string {
  if (!traitType) return "N/A";
  // Split the string by underscores
  const words = traitType.split("_");

  // Capitalize the first letter of each word and join them with spaces
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function decode(stuff: string) {
  return bufferToArray(bs58.decode(stuff));
}
export function bufferToArray(buffer: Buffer): number[] {
  const nums: number[] = [];
  for (let i = 0; i < buffer.length; i++) {
    nums.push(buffer[i]);
  }
  return nums;
}
export const mapProof = (assetProof: { proof: string[] }): AccountMeta[] => {
  if (!assetProof.proof || assetProof.proof.length === 0) {
    throw new Error("Proof is empty");
  }
  return assetProof.proof.map((node) => ({
    pubkey: new PublicKey(node),
    isSigner: false,
    isWritable: false,
  }));
};

export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getProjectImageUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/project-images/${path}`;
}
