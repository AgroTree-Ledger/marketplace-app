import TreeDetailTab from "@/components/trees/TreeDetailTab";
import TreeImage from "@/components/trees/TreeImage";
import { Badge } from "@/components/ui/badge";
import { getAttributeValue } from "@/lib/utils";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";
import TreeActions from "@/components/trees/TreeActions";
import { getAssetFromShyft } from "@/_actions/shyft.action";
type Props = {
  params: {
    address: string;
  };
};
const TreeNftPage: React.FC<Props> = async ({ params: { address } }) => {
  noStore();
  // const data = await getTreeNftAction(address);
  const nft = await getAssetFromShyft(address);
  // console.log("getAssetFromShyft", data, nft);
  if (!nft) {
    return null;
  }
  // const isOnSale = await isNftOnmarketplace(nft.owner, nft.tree, nft.address);
  return (
    <div className="container mx-auto px-3 md:px-8">
      <div className="grid md:grid-cols-3 gap-10 md:p-6">
        <div>
          <TreeImage
            src={nft.file?.uri}
            lat={getAttributeValue(nft, "latitude")}
            lon={getAttributeValue(nft, "longitude")}
          />
        </div>

        <div className="md:col-span-2 space-y-3">
          <div className="space-x-5">
            <Badge
              variant={"outline"}
              className="border border-green-500 py-2 px-3 text-green-500 rounded-lg"
            >
              Age: {getAttributeValue(nft, "age")} years
            </Badge>
            <Badge
              variant={"outline"}
              className="border border-white py-2 px-3 bg-white text-black rounded-lg"
            >
              {getAttributeValue(nft, "species")}
            </Badge>
          </div>
          <h1 className="text-2xl font-bold">{nft.metadata.name}</h1>
          <p className="w-full line-clamp-3 text-muted-foreground">
            {nft.metadata.description}
          </p>
          <div className="flex items-center gap-3 divide-x-2 divide-solid divide-muted-foreground/50 py-2 md:py-5">
            <div className="px-3 text-muted-foreground">
              Current Height:{" "}
              <span className="text-green-500 font-semibold">
                {getAttributeValue(nft, "current_height")}
              </span>{" "}
              m
            </div>
            <div className="px-3 text-muted-foreground">
              Standard GRH:{" "}
              <span className="text-green-500 font-semibold">
                {getAttributeValue(nft, "standard_growth_rate_height")}
              </span>{" "}
              m
            </div>
            <div className="px-3 text-muted-foreground">
              Observed GRH:{" "}
              <span className="text-green-500 font-semibold">
                {getAttributeValue(nft, "observed_growth_rate_height")}
              </span>{" "}
              m
            </div>
            <div className="px-3 text-muted-foreground">
              Co2:{" "}
              <span className="text-green-500 font-semibold">
                {getAttributeValue(nft, "current_CO2_sequestration")}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 md:gap-10 text-muted-foreground">
            <div>
              <h3>Estimated Value:</h3>
              <span className="text-foreground font-semibold">
                {getAttributeValue(nft, "current_estimated_value")}
              </span>{" "}
              USD
            </div>
            <div>
              <h3>Project Developer:</h3>
              <span className="text-foreground font-semibold">
                {getAttributeValue(nft, "project_developer")}
              </span>
            </div>
          </div>
          <div className="py-5">
            <TreeActions nft={nft} />
          </div>
          <div>
            <TreeDetailTab nft={nft} />
          </div>
          {/* <div>
            <pre>
              <code>{JSON.stringify(nft, null, 2)}</code>
            </pre>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TreeNftPage;
