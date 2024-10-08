import { getProjectByIdAction } from "@/_actions/project.action";
import { getAssetListFromShyft } from "@/_actions/shyft.action";
import ProjectImageCarousel from "@/components/projects/ProjectImageCarousel";
import ProjectNfts from "@/components/projects/ProjectNfts";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";
type Props = {
  params: { id: string };
};
const ProjectDetailPage: React.FC<Props> = async ({ params: { id } }) => {
  noStore();
  const project = await getProjectByIdAction(id);

  if (!project) {
    return notFound();
  }

  const nfts = await getAssetListFromShyft(project.nfts);

  const sumValue = nfts.reduce((acc, nft) => {
    return (acc += Number(nft.attributes?.current_estimated_value) || 0);
  }, 0);

  const avgValue = (sumValue / nfts.length).toFixed(2);

  return (
    <div className="container mx-auto px-1 md:px-8">
      <div className="flex flex-col md:flex-row rounded-tl-3xl rounded-br-3xl overflow-hidden">
        <div className="bg-muted-foreground/10 text-white p-8 md:p-12 md:w-1/2 flex flex-col order-2 md:order-1 justify-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">{project?.name}</h2>
            <p className="text-muted-foreground mb-8 line-clamp-3">
              {project?.description}
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center text-sm text-muted-foreground gap-10 md:gap-20">
              <div className="space-y-3">
                <p className="font-semibold">AVG Price:</p>
                <span className="text-foreground font-semibold">
                  {avgValue || "_"}{" "}
                </span>{" "}
                USD
              </div>
              <div className="space-y-3">
                <p className="font-semibold">Quantities:</p>
                <span className="text-foreground font-semibold">
                  {project.nftCount || 0}{" "}
                </span>
                Trees
              </div>
            </div>
            <Button className="bg-foreground text-background hover:bg-foreground/80 font-semibold">
              Join To Project
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 relative bg-muted-foreground/10 order-1 md:order-2">
          <ProjectImageCarousel images={project.images} />
        </div>
      </div>
      <div className="py-10 space-y-5">
        <h2 className="font-semibold">Project Details</h2>
        <p className="text-muted-foreground text-wrap font-sm">
          {project?.content}
        </p>
      </div>
      <div>
        <ProjectNfts nfts={nfts} />
      </div>
    </div>
  );
};

export default ProjectDetailPage;
