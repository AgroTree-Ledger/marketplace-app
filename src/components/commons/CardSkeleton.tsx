import React from "react";

const CardSkeleton = () => {
  return (
    <div>
      <div className="aspect-square bg-muted-foreground/15 rounded-xl" />
      <div className="space-y-2">
        <div className="py-4">
          <h3 className="text-white font-semibold mb-2">
            <div className="h-8 bg-muted-foreground/15" />
          </h3>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <div className="h-4 bg-muted-foreground/15" />
            </div>
            <div>
              <div className="h-4 bg-muted-foreground/15" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
