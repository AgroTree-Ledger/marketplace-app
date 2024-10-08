"use client";
import { cn, getAttributeValue } from "@/lib/utils";
import { TreeNftType } from "@/types/TreeNft.type";
import React from "react";
import dayjs from "dayjs";
type Props = {
  nft: TreeNftType;
};

interface TimelineEvent {
  title: string;
  date: string;
  isActive?: boolean;
}

const TreeTimelineTabContent: React.FC<Props> = ({ nft }) => {
  const events: TimelineEvent[] = [
    {
      title: "Plantation Date:",
      date: dayjs("20" + getAttributeValue(nft, "plantation_date")).format(
        "YYYY/MM/DD"
      ),

      isActive: dayjs(
        "20" + getAttributeValue(nft, "plantation_date")
      ).isBefore(dayjs()),
    },
    {
      title: "First Harvest Date:",
      date: dayjs("20" + getAttributeValue(nft, "first_harvest_date")).format(
        "YYYY/MM/DD"
      ),
      isActive: dayjs(
        "20" + getAttributeValue(nft, "first_harvest_date")
      ).isBefore(dayjs()),
    },
    {
      title: "Second Harvest Date:",
      date: dayjs("20" + getAttributeValue(nft, "second_harvest_date")).format(
        "YYYY/MM/DD"
      ),
      isActive: dayjs(
        "20" + getAttributeValue(nft, "second_harvest_date")
      ).isBefore(dayjs()),
    },
    {
      title: "Third Harvest Date:",
      date: getAttributeValue(nft, "third_harvest_date"),
    },
    {
      title: "Fourth Harvest",
      date: getAttributeValue(nft, "fourth_harvest_date"),
    },
  ];
  return (
    <div className="px-20 p-8 w-full overflow-x-auto">
      <div className="relative min-w-full">
        <div className="flex items-center justify-between h-[250px]">
          {events.map((event, index) => (
            <div key={index} className="flex flex-col items-center">
              {index % 2 === 0 ? (
                <div className="relative w-full h-full">
                  <div className="flex flex-col items-center justify-center absolute -top-2 w-full">
                    <div>
                      <div
                        className={cn(
                          "rounded-full border p-1 w-fit",
                          event.isActive
                            ? "border-green-500"
                            : "border-gray-500"
                        )}
                      >
                        <div
                          className={cn(
                            "size-2  rounded-full",
                            event.isActive ? "bg-green-500" : "bg-gray-500"
                          )}
                        ></div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 justify-center items-center w-[200px] text-sm">
                      <h3 className="text-muted-foreground ">{event.title}</h3>
                      <span>{event.date}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <div className="flex flex-col items-center justify-center absolute -bottom-2 w-full">
                    <div className="flex flex-col gap-2 justify-center items-center w-[200px] text-sm">
                      <h3 className="text-muted-foreground">{event.title}</h3>
                      <span>{event.date}</span>
                    </div>
                    <div>
                      <div
                        className={cn(
                          "rounded-full border p-1 w-fit",
                          event.isActive
                            ? "border-green-500"
                            : "border-gray-500"
                        )}
                      >
                        <div
                          className={cn(
                            "size-2  rounded-full",
                            event.isActive ? "bg-green-500" : "bg-gray-500"
                          )}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="absolute top-[50%] left-0 right-0 border-t border-dashed border-gray-500 w-full"></div>
        {/* <button className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-full">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-full">
          <ChevronRight className="w-6 h-6" />
        </button> */}
      </div>
    </div>
  );
};

export default TreeTimelineTabContent;
