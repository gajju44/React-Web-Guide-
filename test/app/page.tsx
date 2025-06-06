'use client'
import HomeCircle from "@/public/HomeCircle.svg";
import Image from "next/image";
import arrow from "@/public/arrow.svg";
import Logowhite from "@/public/Logowhite.svg";
import { useRef } from 'react';
import TourGuide  from '@gajendra-naphade/react-web-guide';
import '@gajendra-naphade/react-web-guide/dist/styles.css';


export default function Home() {
  const introButtonRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const getStartedRef = useRef(null);


  const tourSteps = [
    {
      ref: introButtonRef,
      name: "Guide",
      color: "black",
      message: "Welcome to PixPort! Let's take a quick tour of our platform.",
      offsetX: 0,
      offsetY: 0,
      CursorMessageGap: 10,
    },
    {
      ref: titleRef,
      name: "Guide",
      color: "black",
      message: "PixPort transforms how you manage digital content with cloud efficiency.",
      offsetX: 0,
      offsetY: 0,
      CursorMessageGap: 10,
    },
    {
      ref: descriptionRef,
      name: "Guide",
      color: "black",
      message: "Our platform provides seamless storage, collaboration, and distribution of your multimedia assets.",
      offsetX: 0,
      offsetY: 0,
      CursorMessageGap: 10,
    },
    {
      ref: getStartedRef,
      name: "Guide",
      color: "black",
      message: "Ready to get started? Click here to begin your PixPort journey!",
      offsetX: 0,
      offsetY: 0,
      CursorMessageGap: 10,
    },
   
  ];

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center overflow-hidden relative">
        <div className="flex flex-col justify-center gap-3 md:gap-5 items-center z-50 w-full px-4 md:px-0 translate-y-[20%] md:translate-y-[30%] h-screen">
          <button 
            ref={introButtonRef}
            className="bg-black/10 flex gap-2 items-center justify-center text-white/50 text-sm md:text-base font-thin px-4 md:px-6 rounded-full upperbutton p-2 md:p-3"
          >
            <Image src={Logowhite} alt="logo" className="w-3 md:w-4" /> Introducing PixPort
          </button>
          <h1 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">Transforming digital content management</h1>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">with cloud efficiency</h1>
          <p ref={descriptionRef} className="w-[90%] md:w-[70%] lg:w-[41%] text-center capitalize text-sm md:text-base">
            digital content management by providing a cloud-based platform for seamless storage, collaboration, and distribution of multimedia assets.
          </p>
          <button 
            ref={getStartedRef}
            className="bg-black flex gap-2 items-center justify-center px-4 md:px-6 rounded-full shadow-[inset_-4px_-4px_6px_rgba(244,106,52,0.15)] p-2 md:p-3 text-sm md:text-base"
          >
            get started <Image alt="logo" src={arrow} className="w-4 md:w-5" />
          </button>
        </div>
        <div className="HomeBlur rounded-full bottom-[5%] md:bottom-[9%]">
          <div className="HomeBlur2 rounded-full"/>
          <div className="HomeBlur3 rounded-full"/>
          <div className="HomeBlur4 rounded-full"/>
        </div>
        <Image
          src={HomeCircle}
          alt="Home Circle"
          className="w-screen h-screen translate-y-[20%] md:translate-y-[30%]"
        />
      </div>

     
        <TourGuide 
          steps={tourSteps}
          onComplete={() => console.log('Tour completed!')}
          startButtonText="Start Tour"
          skipButtonText="Skip Tour"
          minimizedStartText="Start"
          minimizedSkipText="Skip"
          showProgress={true}
          Theme="Dark"
          Minimized={true}
          showTooltip={true}
          buttonPosition={{
            bottom: '2rem',
            right: '2rem'
          }}
          messageClass="custom-message"
          nextButtonText="Next"
          nextButtonContinueText="Continue"
          nextButtonClassName="custom-next-button"
        />
     
    </>
  );
}