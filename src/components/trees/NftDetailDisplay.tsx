import { getTreeNftAction } from "@/_actions/nfts.actions";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { convertTraitType, getShyftTranslatorLink } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import NftImage from "@/components/trees/NftImage";
import { Skeleton } from "../ui/skeleton";
type Props = {
  address: string;
};
const NftDetailDisplay: React.FC<Props> = async ({ address }) => {
  const nft = await getTreeNftAction(address);
  if (!nft) {
    return <div>Not found</div>;
  }
  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold">
              {nft.metadata.name}
            </CardTitle>
            <Badge variant="secondary" className="mt-2">
              {nft.metadata.token_standard} - {nft.metadata.symbol}
            </Badge>
            <CardDescription className="mt-3 text-sm">
              {nft.metadata.description}
            </CardDescription>
          </div>
          <Badge variant="default" className="">
            Asset ID:
            <Link href={getShyftTranslatorLink(nft.address)} target="_blank">
              {nft.address}
            </Link>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="w-full rounded-md bg-primary/30">
              {nft.file?.uri ? <NftImage src={nft.file.uri} /> : null}
            </div>
          </div>
          <div className="col-span-2 space-y-5">
            <h3 className="font-semibold">Metadata</h3>
            <div className="grid grid-cols-2 gap-5">
              {nft.metadata.attributes?.map((attr) => (
                <div
                  key={attr.trait_type}
                  className="border p-3 rounded-md flex justify-between items-center"
                >
                  <span className="text-muted-foreground">
                    {convertTraitType(attr.trait_type)}
                  </span>
                  <span>{attr.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const NftDetailDisplaySkeleton = async () => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold">
              <Skeleton className="w-40 h-6" />
            </CardTitle>
            <Badge variant="secondary" className="mt-2">
              <Skeleton className="w-40 h-6" />
            </Badge>
          </div>
          <Badge variant="default" className="">
            <Skeleton className="w-40 h-6" />
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="w-full rounded-md bg-muted-foreground/10">
              <Skeleton className="w-full h-96" />
            </div>
          </div>
          <div className="col-span-2">Metadata</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NftDetailDisplay;
