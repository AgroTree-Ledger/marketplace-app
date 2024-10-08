import { TreeNftType } from "@/types/TreeNft.type";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import TreeTimelineTabContent from "./tab-content/TreeTimelineTabContent";
import TreeHistoryTransactionsTabContent from "./tab-content/TreeHistoryTransactionsTabContent";
import TreeMetricsTabContent from "./tab-content/TreeMetricsTabContent";

type Props = {
  nft: TreeNftType;
};
const TreeDetailTab: React.FC<Props> = ({ nft }) => {
  return (
    <div>
      <Tabs defaultValue="detail-tree" className="w-full">
        <TabsList className="h-12 bg-background gap-3">
          <TabsTrigger
            value="detail-tree"
            className="bg-muted px-8 py-3 data-[state=active]:bg-muted data-[state=active]:text-green-500 data-[state=active]:shadow-none"
          >
            Detail tree
          </TabsTrigger>
          <TabsTrigger
            value="tree-metrics"
            className="bg-muted px-8 py-3 data-[state=active]:bg-muted data-[state=active]:text-green-500 data-[state=active]:shadow-none"
          >
            Tree metrics
          </TabsTrigger>

          <TabsTrigger
            value="timeline"
            className="bg-muted px-8 py-3 data-[state=active]:bg-muted data-[state=active]:text-green-500 data-[state=active]:shadow-none"
          >
            Timeline
          </TabsTrigger>
          <TabsTrigger
            value="history-transactions"
            className="bg-muted px-8 py-3 data-[state=active]:bg-muted data-[state=active]:text-green-500 data-[state=active]:shadow-none"
          >
            History Transactions
          </TabsTrigger>
        </TabsList>
        <TabsContent value="detail-tree" className="px-1 py-3">
          <div className="space-y-5">
            <h2 className="text-xl font-semibold">{nft.metadata.name}</h2>
            <p className="text-muted-foreground leading-relaxed text-justify tracking-tighter">
              {nft.metadata.description}
            </p>
            <p className="text-muted-foreground leading-relaxed text-justify tracking-tighter">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque quis nulla ornare, lacinia massa id, suscipit lectus.
              Sed sagittis arcu tincidunt sapien egestas, ut suscipit justo
              varius. Vivamus rhoncus laoreet aliquet. Donec rhoncus sapien
              quam, finibus dignissim dolor venenatis at. Nullam consectetur
              nulla libero, eu blandit ex viverra vel. Class aptent taciti
              sociosqu ad litora torquent per conubia nostra, per inceptos
              himenaeos. Mauris rhoncus turpis scelerisque, mattis lectus quis,
              porta ex. Phasellus id ullamcorper arcu. In elementum tortor ut
              accumsan interdum. Mauris lobortis gravida leo. Maecenas quis
              porta est. Etiam non pellentesque odio, vel convallis nulla.
              Integer egestas risus non lectus cursus posuere. Nunc sodales
              rhoncus augue, ut gravida tortor mattis ac. Nunc quis dolor
              lobortis, fermentum massa sit amet, pulvinar ex. Nullam ut ex
              sollicitudin, accumsan urna suscipit, placerat elit. Nunc accumsan
              massa quam, id placerat velit scelerisque a. Mauris tempor orci at
              quam varius consectetur. Cras convallis ipsum eget vulputate
              cursus. Donec ut ipsum nisl. Sed pulvinar at dui nec lacinia.
              Vestibulum non tincidunt arcu. Maecenas sagittis condimentum enim
              sed scelerisque. Suspendisse laoreet dolor nisl, nec tincidunt est
              finibus ac. Donec consequat nulla vitae lectus pretium sagittis.
              Interdum et malesuada fames ac ante ipsum primis in faucibus.
            </p>
            <h2 className="text-xl font-semibold">Nulla luctus posuere arcu</h2>
            <p className="text-muted-foreground leading-relaxed text-justify tracking-tighter">
              Quisque scelerisque odio sit amet nunc consectetur vehicula. Proin
              nibh neque, pulvinar a scelerisque porttitor, dictum non nisl.
              Aliquam tempor interdum magna, ut tincidunt justo. Morbi tincidunt
              volutpat lectus, quis convallis sapien feugiat eu. Integer est
              ligula, elementum sed tempus quis, consequat auctor odio. Integer
              odio lectus, laoreet pharetra ornare et, varius non elit. Donec
              vehicula rutrum risus sit amet fermentum. Integer a nibh vel
              ligula congue finibus. Nulla non varius sapien. Donec ut sagittis
              nunc, eu pretium mi. Aliqu am rutrum venenatis tempor. Sed
              efficitur lacus non lectus euismod, nec feugiat ipsum suscipit.
              Donec maximus nibh eleifend velit tempus commodo. Aenean venenatis
              quam id erat ullamcorper interdum. Nulla purus neque, ultrices sit
              amet quam a, porttitor tincidunt risus.
            </p>
            <p className="text-muted-foreground leading-relaxed text-justify tracking-tighter">
              Ut ac odio magna. Aliquam nec ultricies dui. Cras metus turpis,
              aliquam ut mauris vel, volutpat venenatis enim. Sed feugiat tortor
              non mi pellentesque malesuada. Vestibulum ante ipsum primis in
              faucibus orci luctus et ultrices posuere cubilia curae; Donec et
              ligula dapibus leo imperdiet commodo ac ut orci. Ut nec mi
              ultricies, eleifend est ac, ultrices erat. Proin commodo mollis
              vulputate. Etiam porttitor ullamcorper est, ut pharetra nulla
              facilisis vitae. Donec dignissim finibus metus, quis eleifend
              ante. Suspendisse potenti. Nam iaculis neque ac eros commodo
              suscipit. In id pulvinar turpis, et gravida risus. Mauris aliquam
              eros nec augue dapibus, in bibendum diam fermentum. Ut ex ipsum,
              pharetra nec eleifend id, venenatis a nisi. Mauris sit amet dolor
              non lectus auctor porttitor dignissim nec massa.
            </p>
            <p className="text-muted-foreground leading-relaxed text-justify tracking-tighter">
              Curabitur vestibulum nunc in vehicula lobortis. Pellentesque
              habitant morbi tristique senectus et netus et malesuada fames ac
              turpis egestas. In quis hendrerit erat. Fusce vitae blandit justo,
              eu elementum ipsum. Vivamus faucibus tempus libero nec malesuada.
              Nulla sit amet elit pellentesque magna auctor condimentum.
              Pellentesque pulvinar urna eget velit venenatis, quis cursus ex
              dapibus. Maecenas auctor urna vel augue aliquet, non posuere purus
              dapibus. Donec sollicitudin vehicula ipsum vel convallis. Aenean
              ut cursus ex. Proin nisl nisi, tempor a velit eu, pulvinar
              convallis erat. Morbi vestibulum ligula lobortis malesuada
              malesuada. Vivamus ut enim eget mi tincidunt pretium. Suspendisse
              id nisi eget mi facilisis auctor. Nam faucibus tincidunt laoreet.
              Ut eleifend condimentum felis varius tincidunt.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="tree-metrics" className="px-1 py-3">
          <TreeMetricsTabContent nft={nft} />
        </TabsContent>
        <TabsContent value="timeline" className="px-1 py-3">
          <TreeTimelineTabContent nft={nft} />
        </TabsContent>
        <TabsContent value="history-transactions" className="px-1 py-3">
          <TreeHistoryTransactionsTabContent nft={nft} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TreeDetailTab;
