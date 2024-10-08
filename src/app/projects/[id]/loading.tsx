import React from "react";
import CardSkeleton from "@/components/commons/CardSkeleton";

const loading = () => {
  return (
    <div className="container mx-auto px-1 md:px-8">
      <div className="flex flex-col md:flex-row rounded-tl-3xl rounded-br-3xl overflow-hidden">
        <div className="bg-muted-foreground/10 text-white p-8 md:p-12 md:w-1/2 flex flex-col order-2 md:order-1 justify-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              <div className="h-8 w-48 bg-muted-foreground/20 animate-pulse" />
            </h2>
            <p className="text-muted-foreground mb-8 line-clamp-3">
              <div className="h-5 w-96 bg-muted-foreground/20 animate-pulse" />
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center text-sm text-muted-foreground gap-10 md:gap-20">
              <div className="space-y-3">
                <span className="text-foreground font-semibold">
                  <div className="h-5 w-24 bg-muted-foreground/20 animate-pulse" />
                </span>{" "}
              </div>
              <div className="space-y-3">
                <span className="text-foreground font-semibold">
                  <div className="h-5 w-24 bg-muted-foreground/20 animate-pulse" />
                </span>{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 relative bg-muted-foreground/10 order-1 md:order-2">
          <div className="h-96 bg-muted-foreground/20 animate-pulse" />
        </div>
      </div>
      <div className="py-10 space-y-5">
        <h2 className="font-semibold">
          <div className="h-8 w-48 bg-muted-foreground/20 animate-pulse" />
        </h2>
        <p className="text-muted-foreground text-wrap font-sm">
          <div className="h-5 w-full bg-muted-foreground/20 animate-pulse" />
          <div className="h-5 w-full bg-muted-foreground/20 animate-pulse" />
          <div className="h-5 w-full bg-muted-foreground/20 animate-pulse" />
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-6">
        {[...Array(10)].map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default loading;
