"use client";
import React, { useState } from "react";
//Gallery
import Image1 from "../../public/Gallery/image1.jpg";
import Image2 from "../../public/Gallery/image2.jpg";
import Image3 from "../../public/Gallery/image3.jpg";
import Image4 from "../../public/Gallery/image4.jpg";
import Image5 from "../../public/Gallery/image5.jpg";

import Image from "next/image";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { wrap } from "popmotion";
import { cn } from "../lib/utils";

export default function ImageGallery() {
  // Using an array to keep track of two states
  const [[imageCount, direction], setImageCount] = useState([0, 0]);
  //wrap accepts a range, defined as a min and max
  // Third value is returned if it lies between the range else its wrapped back to the first
  const activeImageIndex = wrap(0, ImageGalleryPhotos.length, imageCount);

  //sets the new state
  const swipeToImage = (swipeDirection) => {
    setImageCount([imageCount + swipeDirection, swipeDirection]);
  };

  //Define a threshold and if the drag exceeds then we swipe
  const dragEndHandler = (dragInfo) => {
    console.log(dragInfo);
    const draggedDistance = dragInfo.offset.x;
    const swipeThreshold = 50;
    if (draggedDistance > swipeThreshold) {
      swipeToImage(-1);
    } else if (draggedDistance < -swipeThreshold) {
      swipeToImage(1);
    }
  };

  //We pass and index and determine where to animate from
  const skipToImage = (imageId) => {
    let changeDirection = 1;
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
      {/* Dont want animation on page load */}
      <AnimatePresence initial={false} custom={direction}>
        <div
          className="animate-in flex flex-col items-center gap-8 justify-center"
          style={{ "--index": 1 }}
        >
          <div className="flex relative justify-center  w-full items-center">
            <motion.div
              // Must be unique
              key={imageCount}
              //Used to alter behavior
              custom={direction}
              variants={sliderVariants}
              initial="incoming"
              animate="active"
              exit="exit"
              transition={sliderTransition}
              //Only on x axis
              drag="x"
              //End of the window either side
              dragConstraints={{ left: 0, right: 0 }}
              // The degree of movement allowed outside constraints.
              dragElastic={1}
              //gives delta, offset,point, and velocity
              onDragEnd={(_, dragInfo) => dragEndHandler(dragInfo)}
              className="flex flex-col cursor-grabbing items-center justify-center"
            >
              <Image
                src={ImageGalleryPhotos[activeImageIndex].image}
                alt={ImageGalleryPhotos[activeImageIndex].alt}
                width={ImageGalleryPhotos[activeImageIndex].width}
                height={ImageGalleryPhotos[activeImageIndex].height}
                placeholder="blur"
                className={cn(
                  "relative h-60 inset-0 object-cover shadow-md pointer-events-none rounded-2xl ",
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
            className="text-sm"
          >
            {ImageGalleryPhotos[activeImageIndex].description}
          </motion.p>

          <div className="flex gap-1 bg-black/25 border-black/40 border-[0.05rem] rounded-xl">
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
                      "w-5 h-5 text-black/40 cursor-pointer",
                      activeImageIndex === index && "text-black"
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
    image: Image1,
    description: "Yellow bus in the city.",
    alt: "Image of me",
    rotate: "-rotate-6",
    width: 320,
    height: 360,
  },
  {
    image: Image2,
    description: "Beautiful corridor in a city...",
    alt: "Image of me",
    rotate: "rotate-6",
    width: 320,
    height: 360,
  },

  {
    image: Image3,
    description: "Pretty mountain view.",
    alt: "Image of me",
    rotate: "-rotate-6",
    width: 320,
    height: 380,
  },
  {
    image: Image4,
    description: "Cool car at the beach.",
    alt: "Image of me",
    rotate: "rotate-6",
    width: 220,
    height: 460,
  },
  {
    image: Image5,
    description: "My pretty palm tree view.",
    alt: "Image of me",
    rotate: "-rotate-6",
    width: 320,
    height: 360,
  },
];
const sliderVariants = {
  incoming: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    scale: 1.2,
    opacity: 0,
  }),
  active: { x: 0, scale: 1, opacity: 1 },
  exit: (direction) => ({
    x: direction > 0 ? "-100%" : "100%",
    scale: 1,
    opacity: 0.2,
  }),
};

const sliderTransition = {
  duration: 0.5,
  ease: [0.56, 0.03, 0.12, 1.04],
};
