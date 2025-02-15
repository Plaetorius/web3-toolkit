'use client';

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import CodeBlock from "@/components/ui/CodeBlock";
import SplitText from "@/components/title/SplitText";
import ShinyText from "@/components/title/ShinyText";
import { Upload } from "lucide-react";
import { choosePhotos } from "@/lib/handlePhotos";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [diagnostic, setDiagnostic] = useState<string | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1;
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDiagnostic("Your results have been processed. Please check the results tab.");
    }, 5000);

    return () => clearInterval(interval);
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
            <SplitText
              text="Powerful for developers. Fast for everyone."
              className="text-8xl font-semibold text-white"
              delay={50}
              animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
              animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
              easing="easeOutCubic"
              threshold={0.0}
              rootMargin=""
              textAlign="left"
              // onLetterAnimationComplete={handleAnimationComplete}
            />
            
            {/* <h1 className="text-white text-8xl font-bold antialiased font-['Ubuntu']">

              Powerful for <br />developers. <br />Fast for <br />everyone.
            </h1> */}
            <div className="flex items-center justify-center p-6">
              <CodeBlock code={sampleCode} language="javascript" />
              {/* <Image src="globe.svg" width={500} height={500} alt="Globe image" className="flex flex-grow h-80" /> */}
            </div>
          </div>
          <div className="flex flex-row items-center space-x-4 mt-10 text-white text-opacity-80">
            <Button 
              className="
                text-xl uppercase
                bg-gradient-to-r from-indigo-500 to-indigo-900
                hover:scale-105 hover:bg-gradient-to-r hover:from-indigo-800 hover:to-indigo-200
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
              hover:bg-opacity-100 hover:bg-white hover:text-indigo-900 hover:scale-105
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
            ">
            <ShinyText 
              text="Building & shipping Web3 applications has never been easier." 
              disabled={false} 
              speed={4} 
              className="text-white text-opacity-50 text-2xl font-['Ubuntu']" 
            />
          </div>
        </div>
      </div>
      <div className="h-screen w-full bg-slate-900">
        <div className="flex items-center justify-center h-[20vh] w-full text-white text-6xl font-bold font-['Ubuntu'] bg-slate-950">
          Examination
        </div>
        <div className="p-4 grid grid-cols-2 gap-4 flex justify-center items-center h-[80vh] w-full bg-slate-900">
          <div className="flex flex-col justify-center items-center w-full h-full">
            <Button 
              className="
              text-white 
              flex flex-col justify-center items-center 
              bg-transparent
              h-[50%] w-[50%] 
              rounded-2xl 
              border border-8 border-dashed border-white
              hover:scale-105
              transition-all duration-300 ease-in-out
              "
              onClick={choosePhotos}
              >
              <div className="flex flex-row items-center gap-4 text-2xl h-full font-['Ubuntu']">
                <Upload size={150} strokeWidth={2} style={{ width: '40px', height: '40px' }} />
                Upload
              </div>
            </Button>
          </div>
          <div className="flex flex-col p-8 text-white bg-red-500 h-full">
            <h3 className="text-4xl font-bold font-['Ubuntu']">
              Results
            </h3>
            {diagnostic 
              ? 
                <div>
                  {diagnostic}
                </div>
              :
                <div>
                  Your results will appear here shortly...
                </div>
              }
          </div>
        </div>
      </div>
    </div>
  );
}
