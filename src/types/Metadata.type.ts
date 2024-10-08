import { JsonValue } from "@prisma/client/runtime/library";

export type NftMetadataType = {
  name: string;
  description: string;
  image: string;
  [key: string]: string;
};

export type NftMetadataDbType = {
  id: number;
  name: string;
  description: string;
  image: string;
  metadata: JsonValue;
  collectionId: number;
  createdAt: Date;
  creatorId: string;
  address: string | null;
  assetId: string | null;
  minted: boolean;
  uri: string | null;
  tx: string | null;
};

export type NftTraitType = {
  trait_type: string;
  value: string;
};
