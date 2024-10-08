import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div className="container mx-auto px-3 md:px-8 ">
      <div className="grid md:grid-cols-3 gap-10 md:p-6">
        <Skeleton className="w-full aspect-square" />
        <div className="md:col-span-2 space-y-3">
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
        </div>
      </div>
    </div>
  );
};

export default loading;
