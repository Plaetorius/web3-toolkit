'use client';

import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import Image from "next/image";
import CodeBlock from "@/components/ui/CodeBlock";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1;
    }
  }, []);

  const sampleCode = `const hello = "Hello, World!";
console.log(hello);`;

  return (
    <div>
      <div className="relative w-full min-h-screen overflow-hidden">
        <video
          ref={videoRef}
          className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
          preload="none"
          muted
          playsInline
          loop
          autoPlay
          src="/videos/background.webm"
        ></video>
        <div className="relative z-10 flex flex-col justify-center min-h-screen px-[10vw]">
          <div className="w-full flex flex-row justify-between items-center space-x-4">
            <h1 className="text-white text-8xl font-bold antialiased font-['Ubuntu']">
              Powerful for <br />developers. <br />Fast for <br />everyone.
            </h1>
            <div className="flex items-center justify-center p-6">
              <CodeBlock code={sampleCode} language="javascript" />
            </div>
            {/* <Image src="globe.svg" width={500} height={500} alt="Globe image" className="flex flex-grow h-80" /> */}
          </div>
          <div className="flex flex-row items-center space-x-4 mt-10 text-white text-opacity-80">
            <Button 
              className="
                text-xl uppercase
                bg-gradient-to-r from-indigo-400 to-indigo-900
                hover:scale-105
                transition-all duration-400 ease-in-out 
                rounded-full px-10 py-7
                font-['Ubuntu']
              ">
              START BUILDING
            </Button>
            <Button 
              className="
              text-xl uppercase
              bg-transparent
              hover:bg-opacity-100
              border border-white
              transition-all duration-300 ease-in-out
              rounded-full px-10 py-7
              font-['Ubuntu']
            "> 
              DOCUMENTATION
            </Button>
          </div>
          <div className="
            mt-9 
            text-2xl
            font-['Ubuntu'] 
            text-white 
            text-opacity-80
            ">
            Building & shipping Web3 applications have never been easier.
          </div>
        </div>
      </div>
      <div className="h-screen w-full bg-red-500 flex justify-center items-center">
        Welcome to my second section
      </div>
    </div>
  );
}
