"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { getProjectImageUrl } from "@/lib/utils";
import { AspectRatio } from "../ui/aspect-ratio";

type Props = {
  images: string[];
};

const ProjectImageCarousel: React.FC<Props> = ({ images }) => {
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
        {images.map((item, index) => (
          <CarouselItem key={index} className="select-none">
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <Image
                src={getProjectImageUrl(item)}
                alt={"project image"}
                fill
                className="z-0 object-fill rounded-tl-3xl rounded-br-3xl"
              />
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        variant={"link"}
        className="hover:bg-muted-foreground/50 border border-muted-foreground/80"
      />
      <CarouselNext
        variant={"link"}
        className="hover:bg-muted-foreground/50 border border-muted-foreground/80"
      />
    </Carousel>
  );
};

export default ProjectImageCarousel;
