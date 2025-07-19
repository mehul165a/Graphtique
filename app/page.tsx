"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Home() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const companyRow1Ref = useRef<HTMLDivElement>(null);
  const companyRow2Ref = useRef<HTMLDivElement>(null);

  const [yearsCount, setYearsCount] = useState(0);
  const [customersCount, setCustomersCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);

  useEffect(() => {
    const counterSection = document.getElementById("counter-section");
    if (!counterSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const duration = 1000;
          const startTime = performance.now();
          const animateCount = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            setYearsCount(Math.floor(progress * 2));
            setCustomersCount(Math.floor(progress * 20));
            setProjectsCount(Math.floor(progress * 30));
            if (progress < 1) requestAnimationFrame(animateCount);
          };
          requestAnimationFrame(animateCount);
          observer.disconnect(); 
        }
      },
      { threshold: 0.3 } 
    );

    observer.observe(counterSection);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    
    const content = scroller.innerHTML;
    scroller.innerHTML = content + content;
    
    let animationFrameId: number;
    let scrollPos = 0;
    const speed = 1;

    const animate = () => {
      scrollPos += speed;
      if (scrollPos >= scroller.scrollWidth / 2) scrollPos = 0;
      scroller.style.transform = `translateX(-${scrollPos}px)`;
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  useEffect(() => {
    const animateScroll = (
      ref: React.RefObject<HTMLDivElement | null>,
      speed: number,
      reverse: boolean = false
    ) => {
      const container = ref.current;
      if (!container) return;

      const contentWidth = container.scrollWidth / 2;
      let animationFrameId: number;
      let scrollPos = 0;

      const animate = () => {
        scrollPos += speed;
        if (scrollPos >= contentWidth) scrollPos = 0;
        const direction = reverse ? -scrollPos : scrollPos;
        container.style.transform = `translateX(${direction}px)`;
        animationFrameId = requestAnimationFrame(animate);
      };

      animate();
      return () => cancelAnimationFrame(animationFrameId);
    };

    animateScroll(companyRow1Ref, 0.5, false);
    animateScroll(companyRow2Ref, 0.5, true);
  }, []);

  return (
    <div className="relative min-h-screen text-white px-12 py-5 overflow-x-hidden">
      <div className="absolute top-4 left-12">
        <Image src="/graphtique logo.svg" alt="Logo" width={200} height={50} />
      </div>

      <div className="absolute -top-[0px] right-[0px] blur-3xl" style={{ opacity: 0.66 }}>
        <Image src="/circles.svg" alt="Three Circles" width={500} height={500} />
      </div>

      <div className="absolute mt-20 flex flex-col max-w-xl left-18 z-10">
        <p className=" mb-[-5] text-3xl text-[#FFA620] font-allura">Welcome to</p>
        <p className="text-[60px] font-normal font-montserrat">Graphtique</p>
        <p className="text-[26px] font-normal font-montserrat">
          Creative Design Studio by <br /> Shreya Sharma
        </p>
        <p className="text-[18px] font-light text-[#FFFFFF] mt-8 mb-8 text-justify w-[731px] font-montserrat">
          We are Graphtique — A Creative Design Studio<br /> specializing in Graphic
          Design & UI/UX Design. We <br />help you build powerful visual experiences
          that<br /> connect with your audience.
        </p>

        <div className="relative w-[175px] h-[60px] rounded-[16px] overflow-hidden">
          <div
            className="absolute inset-0 rounded-[14px] pointer-events-none"
            style={{
              borderWidth: "2px",
              borderStyle: "solid",
              borderImage: "linear-gradient(-69deg, #444444 0%, #FFFFFF 52%, #888888 90%) 1",
              borderRadius: "16px",
            }}
          ></div>
          <button
            className="w-full h-full rounded-[14px] flex items-center justify-center relative"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(58,58,58,0.5) 100%)",
            }}
          >
            <span className="font-normal font-montserrat text-white text-[28px]">
              Hire Us
            </span>
          </button>
        </div>
      </div>

      <div className="absolute top-0 right-0 z-20">
        <Image src="/cover image.svg" alt="Right Side SVG" width={525} height={525} />
      </div>
      <div
        className="absolute bottom-[40px] left-1/2 w-screen h-[48px] bg-[#1c1c1c] origin-center overflow-hidden z-50"
        style={{
          transform: 'translateX(-50%) rotate(-3.27deg)',
          boxShadow: '0 0 14px rgba(255, 255, 255, 0.30)',
          transformOrigin: 'center',
        }}
      >
        <div
          ref={scrollerRef}
          className="flex items-center h-full will-change-transform absolute whitespace-nowrap"
        >
          {["Graphic Designing", "UI/UX Designing", "Business Branding", "Logo Designing"].map((text, i) => (
            <React.Fragment key={i}>
              <span className="text-[20px] font-montserrat font-medium text-white mx-4">
                {text}
              </span>
              <Image src="/Soft Star.svg" alt="Star" width={24} height={24} className="mx-2" />
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="absolute left-18 mt-[725px] z-10">
        <h2 className="text-[44px] font-montserrat font-semibold text-white relative">
          Who We Are?
          <div className="absolute bottom-[-8px] left-0 w-full flex">
            <span className="h-[2.5px] bg-white rounded-sm" style={{ width: '95%' }}></span>
            <span className="h-[2.5px] bg-white rounded-sm" style={{ width: '10%', marginLeft: '4px' }}></span>
            <span className="h-[2.5px] bg-white rounded-sm" style={{ width: '5%', marginLeft: '4px' }}></span>
            <span className="h-[2.5px] bg-white rounded-sm" style={{ width: '3%', marginLeft: '4px' }}></span>
          </div>
        </h2>
      </div>
      <div className="absolute left-12 mt-[900px] z-10 flex items-start gap-12">
        <div className="flex-shrink-0">
          <Image  className="mt-[-50]"src="/Who Section.svg" alt="About Graphtique" width={330} height={330}/>
        </div>
        <p className="text-white font-montserrat text-[26px] font-normal leading-relaxed text-justify w-[725px] ml-10">
          Graphtique is a creative design studio founded by Shreya Sharma, a passionate 
          designer dedicated to crafting exceptional visual experiences. We
          specialize in Graphic Design and UI/UX Design, working with businesses
          worldwide to bring their ideas to life.
        </p>
      </div>

      <div id="counter-section" className="absolute left-1/2 transform -translate-x-1/2 mt-[1250px] z-10 w-full max-w-full">
        <div className="flex justify-center items-center gap-28">
          <div className="flex flex-col items-center">
            <span 
              className="text-[76px] font-alfa-slab-one"
              style={{
                background: "linear-gradient(-24deg, #981C82 0%, #ED6D65 56%, #B07900 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent"
              }}
            >
              {yearsCount}+
            </span>
            <p className="text-[24px] font-montserrat font-medium text-[#9F9F9F] text-center">
              Years of Design <br/> Experience
            </p>
          </div>
          <div className="h-56 w-[2px] bg-[#585858]"></div>
          <div className="flex flex-col items-center">
            <span 
              className="text-[76px] font-alfa-slab-one"
              style={{
                background: "linear-gradient(-24deg, #981C82 0%, #ED6D65 56%, #B07900 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent"
              }}
            >
              {customersCount}+
            </span>
            <p className="text-[24px] font-montserrat font-medium text-[#9F9F9F] text-center">
              Overall Global<br />Customers
            </p>
          </div>
          <div className="h-56 w-[2px] bg-[#585858]"></div>
          <div className="flex flex-col items-center">
            <span 
              className="text-[76px] font-alfa-slab-one mb-10"
              style={{
                background: "linear-gradient(-24deg, #981C82 0%, #ED6D65 56%, #B07900 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent"
              }}
            >
              {projectsCount}+
            </span>
            <p className="text-[24px] font-montserrat font-medium text-[#9F9F9F]">
              Overall Projects
            </p>
          </div>
        </div>
      </div>

      <div className="absolute left-5 mt-[1600px] z-10 w-full px-12">
  {/* Projects Section Heading */}
  <h2 className="text-[44px] font-montserrat font-semibold text-white relative">
    Projects
    <div className="absolute bottom-[-8px] left-0 w-[200px] flex">
      <span className="h-[2.5px] bg-white rounded-sm" style={{ width: '95%' }}></span>
      <span className="h-[2.5px] bg-white rounded-sm" style={{ width: '10%', marginLeft: '4px' }}></span>
      <span className="h-[2.5px] bg-white rounded-sm" style={{ width: '5%', marginLeft: '4px' }}></span>
      <span className="h-[2.5px] bg-white rounded-sm" style={{ width: '3%', marginLeft: '4px' }}></span>
    </div>
  </h2>

  {/* Projects Grid */}
  <div className="mt-16 grid grid-cols-3 gap-4 justify-center">
    {/* Row 1 */}
    <a href="/project1" className="group">
      <div className="h-[300px] bg-[#1c1c1c] rounded-[16px] p-6 flex flex-col items-center justify-center transition-all hover:scale-105">
        <div className="mb-6 w-[120px] h-[120px] flex items-center justify-center">
          <Image src="/medicons.svg" alt="Medicons" width={120} height={120} className="object-contain" />
        </div>
        <h3 className="text-[28px] font-montserrat font-semibold text-center text-transparent bg-clip-text"
          style={{
            backgroundImage: 'linear-gradient(-24deg, #981C82 0%, #ED6D65 56%, #B07900 100%)'
          }}>
          Medicons
        </h3>
        <p className="text-[18px] font-montserrat font-light text-center text-[#FFFFFF] mt-2">
          Healthcare Branding
        </p>
      </div>
    </a>

    <a href="/project2" className="group">
      <div className="h-[300px] bg-[#1c1c1c] rounded-[16px] p-6 flex flex-col items-center justify-center transition-all hover:scale-105">
        <div className="mb-6 w-[120px] h-[120px] flex items-center justify-center">
          <Image src="/instagiftify.svg" alt="Instagiftify" width={120} height={120} className="object-contain" />
        </div>
        <h3 className="text-[28px] font-montserrat font-semibold text-center text-transparent bg-clip-text"
          style={{
            backgroundImage: 'linear-gradient(-24deg, #981C82 0%, #ED6D65 56%, #B07900 100%)'
          }}>
          Instagiftify
        </h3>
        <p className="text-[18px] font-montserrat font-light text-center text-[#FFFFFF] mt-2">
          Social Media Platform
        </p>
      </div>
    </a>

    <a href="/project3" className="group">
      <div className="h-[300px] bg-[#1c1c1c] rounded-[16px] p-6 flex flex-col items-center justify-center transition-all hover:scale-105">
        <div className="mb-6 w-[120px] h-[120px] flex items-center justify-center">
          <Image src="/TAI.svg" alt="TAI" width={120} height={120} className="object-contain" />
        </div>
        <h3 className="text-[28px] font-montserrat font-semibold text-center text-transparent bg-clip-text"
          style={{
            backgroundImage: 'linear-gradient(-24deg, #981C82 0%, #ED6D65 56%, #B07900 100%)'
          }}>
          TAI
        </h3>
        <p className="text-[18px] font-montserrat font-light text-center text-[#FFFFFF] mt-2">
          Technology Solutions
        </p>
      </div>
    </a>

    {/* Row 2 */}
    <a href="/project4" className="group mt-8">
      <div className="h-[300px] bg-[#1c1c1c] rounded-[16px] p-6 flex flex-col items-center justify-center transition-all hover:scale-105">
        <div className="mb-6 w-[120px] h-[120px] flex items-center justify-center">
          <Image src="/OMA Udyog.svg" alt="OMA Udyog" width={120} height={120} className="object-contain" />
        </div>
        <h3 className="text-[28px] font-montserrat font-semibold text-center text-transparent bg-clip-text"
          style={{
            backgroundImage: 'linear-gradient(-24deg, #981C82 0%, #ED6D65 56%, #B07900 100%)'
          }}>
          OMA Udyog
        </h3>
        <p className="text-[18px] font-montserrat font-light text-center text-[#FFFFFF] mt-2">
          Manufacturing
        </p>
      </div>
    </a>

    <a href="/project5" className="group mt-8">
      <div className="h-[300px] bg-[#1c1c1c] rounded-[16px] p-6 flex flex-col items-center justify-center transition-all hover:scale-105">
        <div className="mb-6 w-[120px] h-[120px] flex items-center justify-center">
          <Image src="/Chica Loca.svg" alt="Chica Loca" width={120} height={120} className="object-contain" />
        </div>
        <h3 className="text-[28px] font-montserrat font-semibold text-center text-transparent bg-clip-text"
          style={{
            backgroundImage: 'linear-gradient(-24deg, #981C82 0%, #ED6D65 56%, #B07900 100%)'
          }}>
          Chica Loca
        </h3>
        <p className="text-[18px] font-montserrat font-light text-center text-[#FFFFFF] mt-2">
          Fashion Brand
        </p>
      </div>
    </a>

    <a href="/project6" className="group mt-8">
      <div className="h-[300px] bg-[#1c1c1c] rounded-[16px] p-6 flex flex-col items-center justify-center transition-all hover:scale-105">
        <div className="mb-6 w-[120px] h-[120px] flex items-center justify-center">
          <Image src="/project-placeholder.svg" alt="Project 6" width={120} height={120} className="object-contain" />
        </div>
        <h3 className="text-[28px] font-montserrat font-semibold text-center text-transparent bg-clip-text"
          style={{
            backgroundImage: 'linear-gradient(-24deg, #981C82 0%, #ED6D65 56%, #B07900 100%)'
          }}>
          Project 6
        </h3>
        <p className="text-[18px] font-montserrat font-light text-center text-[#FFFFFF] mt-2">
          Coming Soon
        </p>
      </div>
    </a>
  </div>
</div>

      <div className="absolute left-0 mt-[2500px] z-10 w-full px-0">
        <h2 className="text-[44px] font-montserrat font-semibold text-white relative pl-12">
          Companies Weapos;ve Worked With
          <div className="absolute bottom-[-8px] left-12 flex w-180">
            <span className="h-[2.5px] bg-white rounded-sm" style={{ width: '95%' }}></span>
            <span className="h-[2.5px] bg-white rounded-sm" style={{ width: '10%', marginLeft: '4px' }}></span>
            <span className="h-[2.5px] bg-white rounded-sm" style={{ width: '5%', marginLeft: '4px' }}></span>
            <span className="h-[2.5px] bg-white rounded-sm" style={{ width: '3%', marginLeft: '4px' }}></span>
          </div>
        </h2>

        <div className="overflow-hidden mt-12 w-full">
          <div ref={companyRow1Ref} className="flex items-center w-max gap-6 pl-6">
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={`row1-${i}`}>
                {["Scintillo","Estilo","Instagiftify","Luxury Aesthetics"].reverse().map((name, j) => (
                  <div
                    key={`${i}-${j}`}
                    className="px-12 py-4 text-[24px] font-montserrat text-white text-center rounded-full border-[2px] border-white"
                    style={{
                      background: "linear-gradient(-2deg, rgba(255,255,255,0.11) 0%, rgba(58,58,58,0.11) 100%)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                    }}
                  >
                    {name}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="overflow-hidden mt-8 w-full">
          <div ref={companyRow2Ref} className="flex items-center w-max gap-6 pl-6">
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={`row2-${i}`}>
                {["Luxury Aesthetics","OMA Udyog","Fallovcom","Exotik","Estilo"].reverse().map((name, j) => (
                  <div
                    key={`${i}-${j}`}
                    className="px-12 py-4 text-[24px] font-montserrat text-white text-center rounded-full border-[2px] border-white"
                    style={{
                      background: "linear-gradient(-2deg, rgba(255,255,255,0.11) 0%, rgba(58,58,58,0.11) 100%)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                    }}
                  >
                    {name}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 mt-[3050px] w-[90%] max-w-6xl z-10 mb-40">
        <div 
          className="relative rounded-[25px] p-8 h-[400px] mb-20"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.4) 1%, rgba(255,255,255,0) 100%)',
            border: '1.5px solid white',
          }}
        >
          <div className="absolute -top-40 left-[-5] z-20">
            <Image
              src="/Footer.svg"
              alt="Footer decoration"
              width={450}
              height={490}
            />
          </div>

          <div className="ml-[640px] pl-8 border-l border-white/30">
            <div className="mb-6">
              <p className="text-[20px] font-montserrat font-semibold text-white mb-2 text-right">
                Professional <br/> Account
              </p>
              <div className="flex flex-col">
                <a 
                  href="https://www.linkedin.com/company/graphtique/" 
                  className="text-[20px] font-montserrat font-light text-white hover:underline text-right"
                >
                  Graphtique - LinkedIn
                </a>
                <a 
                  href="https://www.instagram.com/graphtique?igsh=YmsyY3NsNHphcW5z" 
                  className="text-[20px] font-montserrat font-light text-white hover:underline text-right"
                >
                  Graphtique - Instagram
                </a>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-[20px] font-montserrat font-semibold text-white mb-2 text-right">
                Contact Us
              </p>
              <a 
                href="mailto:graphtique165@gmail.com" 
                className="text-[20px] font-montserrat font-light text-white hover:underline text-right ml-33"
              >
                graphtique165@gmail.com
              </a>
            </div>
          </div>

          <div className="border-t border-white/30 w-full mt-[200px]" style={{ marginTop: '45px' }}></div>

          <div className="flex justify-between items-center mt-4">
            <p className="text-[12px] font-montserrat font-light text-white ml-4">
              © 2025 Graphtique All Rights Reserved
            </p>

            <div className="flex gap-4">
              <a 
                href="mailto:graphtique165@gmail.com"
                className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Image
                  src="/email (1).png"
                  alt="Email"
                  width={20}
                  height={20}
                />
              </a>

              <a 
                href="https://www.instagram.com/graphtique?igsh=YmsyY3NsNHphcW5z"
                className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Image
                  src="/instagram.png"
                  alt="Instagram"
                  width={20}
                  height={20}
                />
              </a>

              <a 
                href="https://www.linkedin.com/company/graphtique/"
                className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Image
                  src="/linkedin.png"
                  alt="LinkedIn"
                  width={20}
                  height={20}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}