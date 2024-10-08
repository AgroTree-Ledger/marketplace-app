"use client";
import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { getCollectionsAction } from "@/_actions/collection.actions";
import Image from "next/image";
import Link from "next/link";
type Props = {
  collections: Awaited<ReturnType<typeof getCollectionsAction>>;
};
const CollectionCarousel: React.FC<Props> = ({ collections }) => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent className="-ml-3">
        {collections.map((item) => (
          <CarouselItem
            key={item.id}
            className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 select-none pl-3"
          >
            <div className="relative w-full sm:max-w-[290px] h-screen max-h-[260px] rounded-xl overflow-hidden">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="z-0 object-fill"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
              <div className="absolute bottom-0 left-0 px-4 py-2 z-20 text-white w-full backdrop-blur-sm bg-black/10">
                <Link href={`/collections/${item.publickey}`}>
                  <h2 className="font-semibold mb-1 hover:font-bold">
                    {item.name}
                  </h2>
                </Link>
                <p className="text-sm text-gray-300">
                  Have: {item.NftMetadata.length} NFT
                </p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CollectionCarousel;
