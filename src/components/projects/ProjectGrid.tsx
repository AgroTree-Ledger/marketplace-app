"use client";
import { getProjectsAction } from "@/_actions/project.action";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import CardSkeleton from "../commons/CardSkeleton";
import { Earth } from "lucide-react";
import NftImage from "../trees/NftImage";
import {
  getExplorerLink,
  getProjectImageUrl,
  truncateAddress,
} from "@/lib/utils";
import dayjs from "dayjs";
import Link from "next/link";

const ProjectGrid = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-projects"],
    queryFn: async () => getProjectsAction(),
  });

  return (
    <div className="container mx-auto py-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <Earth className="size-5 mr-2" /> All Projects
        </h2>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[...Array(10)].map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {data?.map((project) => (
            <div key={project.id}>
              <div className="aspect-square bg-muted-foreground/15 rounded-xl">
                <NftImage src={getProjectImageUrl(project.images[0])} />
              </div>
              <div className="space-y-1">
                <div className="py-3">
                  <Link href={`/projects/${project.id}`}>
                    <h3 className="font-semibold mb-2">{project.name}</h3>
                  </Link>
                  <p className="line-clamp-2 text-xs text-muted-foreground">
                    {project.description}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                  <div>
                    Created by:{" "}
                    <div className="font-semibold text-foreground">
                      <a href={getExplorerLink(project.userId)} target="_blank">
                        {truncateAddress(project.userId)}
                      </a>
                    </div>
                  </div>
                  <div>
                    Created at:{" "}
                    <div className="font-semibold text-foreground">
                      {dayjs(project.createdAt).format("DD MMM YYYY")}
                    </div>
                  </div>
                  <div>
                    Collections:{" "}
                    <div className="font-semibold text-foreground">
                      {project.Collection.length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectGrid;
