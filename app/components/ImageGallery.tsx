"use client";
import React, { useState } from "react";
//Gallery
import gymPic from "public/gallery/gym-pic.jpg";
import carPic from "public/gallery/diego-car.png";
import deskPic from "public/gallery/desk-setup.png";
import fairPic from "public/gallery/diego-fair.png";
import bennieCarPic from "public/gallery/diego-bennie.png";
import gymFacePic from "public/gallery/gym-face.jpg";
import sitPic from "public/gallery/sit-pic.jpg";
import Image from "next/image";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Photo } from "./Gallery";
import { wrap } from "popmotion";

export default function ImageGallery() {
  const [[imageCount, direction], setImageCount] = useState([0, 0]);
  const activeImageIndex = wrap(0, ImageGalleryPhotos.length, imageCount);

  const swipeToImage = (swipeDirection: any) => {
    setImageCount([imageCount + swipeDirection, swipeDirection]);
  };

  const dragEndHandler = (dragInfo: any) => {
    const draggedDistance = dragInfo.offset.x;
    const swipeThreshold = 50;
    if (draggedDistance > swipeThreshold) {
      swipeToImage(-1);
    } else if (draggedDistance < -swipeThreshold) {
      swipeToImage(1);
    }
  };

  const skipToImage = (imageId: any) => {
    let changeDirection: number = 1;
    if (imageId > activeImageIndex) {
      changeDirection = 1;
    } else if (imageId < activeImageIndex) {
      changeDirection = -1;
    }
    setImageCount([imageId, changeDirection]);
  };
  return (
    <React.Fragment>
      {" "}
      <AnimatePresence initial={false} custom={direction}>
        <div
          className="animate-in flex flex-col items-center gap-8 justify-center"
          style={{ "--index": 1 } as React.CSSProperties}
        >
          <div className="flex relative justify-center  w-full items-center">
            {" "}
            <motion.div
              key={imageCount}
              custom={direction}
              variants={sliderVariants}
              //   style={{
              //     width: ImageGalleryPhotos[activeImageIndex].width,
              //     height: ImageGalleryPhotos[activeImageIndex].height,
              //   }}
              initial="incoming"
              animate="active"
              exit="exit"
              transition={sliderTransition}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(_, dragInfo) => dragEndHandler(dragInfo)}
              className="flex flex-col gap-7 items-center justify-center"
            >
              <Image
                src={ImageGalleryPhotos[activeImageIndex].image}
                alt={ImageGalleryPhotos[activeImageIndex].alt}
                width={ImageGalleryPhotos[activeImageIndex].width}
                height={ImageGalleryPhotos[activeImageIndex].height}
                placeholder="blur"
                className={cn(
                  "relative h-60 inset-0 object-cover  bezel-border p-1 bg-gray-400 shadow-md pointer-events-none rounded-2xl ",
                  ImageGalleryPhotos[activeImageIndex].rotate
                )}
              />
            </motion.div>
          </div>
          <motion.p
            key={imageCount}
            transition={sliderTransition}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-sm text-secondary"
          >
            {ImageGalleryPhotos[activeImageIndex].description}
          </motion.p>

          <div className="flex gap-1 bezel-border rounded-xl">
            {ImageGalleryPhotos.map((_, index) => {
              return (
                <motion.span
                  key={index}
                  transition={sliderTransition}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className=""
                >
                  <DotFilledIcon
                    onClick={() => skipToImage(index)}
                    className={cn(
                      "w-5 h-5 text-white/40 cursor-pointer",
                      activeImageIndex === index && "text-white"
                    )}
                  />
                </motion.span>
              );
            })}
          </div>
        </div>
      </AnimatePresence>
    </React.Fragment>
  );
}
const ImageGalleryPhotos = [
  {
    image: carPic,
    description: "Me driving to a coffee shop or the gym.",
    alt: "Image of me",
    rotate: "-rotate-6",
    flipDirection: "left",
    width: 320,
    height: 360,
  },
  {
    image: bennieCarPic,
    description: "Listening to taylor swift probably...",
    alt: "Image of me",
    rotate: "rotate-6",
    flipDirection: "left",
    width: 320,
    height: 360,
  },

  {
    image: gymPic,
    description: "I love lifting weights.",
    alt: "Image of me",
    rotate: "-rotate-6",
    flipDirection: "left",
    width: 320,
    height: 380,
  },
  {
    image: fairPic,
    description: "Me at the fair.",
    alt: "Image of me",
    rotate: "rotate-6",
    flipDirection: "left",
    width: 220,
    height: 460,
  },
  {
    image: deskPic,
    description: "My pretty desk.",
    alt: "Image of me",
    rotate: "-rotate-6",
    flipDirection: "left",
    width: 320,
    height: 360,
  },
];
const sliderVariants = {
  incoming: (direction: any) => ({
    x: direction > 0 ? "100%" : "-100%",
    scale: 1.2,
    opacity: 0,
  }),
  active: { x: 0, scale: 1, opacity: 1 },
  exit: (direction: any) => ({
    x: direction > 0 ? "-100%" : "100%",
    scale: 1,
    opacity: 0.2,
  }),
};

const sliderTransition = {
  duration: 0.5,
  ease: [0.56, 0.03, 0.12, 1.04],
};
