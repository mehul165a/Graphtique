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
  const [isMobile, setIsMobile] = useState(false);
  const sectionSpacing = isMobile ? 100 : 200;
  const heroHeight = isMobile ? 500 : 700;
  const whoWeAreTop = heroHeight + sectionSpacing;
  const counterTop = whoWeAreTop + (isMobile ? 300 : 400);
  const projectsTop = counterTop + (isMobile ? 300 : 400);
  const companiesTop = projectsTop + (isMobile ? 900 : 1200);
  const footerTop = companiesTop + (isMobile ? 500 : 600);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    <div className="relative min-h-screen text-white px-4 md:px-12 py-5 overflow-x-hidden">
      {/* Logo */}
      <div className="absolute top-4 left-4 md:left-12 z-50">
        <Image 
          src="/graphtique logo.svg" 
          alt="Logo" 
          width={isMobile ? 120 : 200} 
          height={isMobile ? 30 : 50} 
        />
      </div>

      {/* Background Circles */}
      <div className="absolute -top-[0px] right-[0px] blur-3xl" style={{ opacity: 0.66 }}>
        <Image 
          src="/circles.svg" 
          alt="Three Circles" 
          width={isMobile ? 300 : 500} 
          height={isMobile ? 300 : 500} 
        />
      </div>

      {/* Hero Section */}
      <div 
        className="absolute mt-20 md:mt-32 flex flex-col max-w-xl left-4 md:left-18 z-10"
        style={{ top: '20px' }}
      >
        <p className="mb-[-5] text-xl md:text-3xl text-[#FFA620] font-allura">Welcome to</p>
        <p className="text-[40px] md:text-[60px] font-normal font-montserrat">Graphtique</p>
        <p className="text-[18px] md:text-[26px] font-normal font-montserrat">
          Creative Design Studio by <br /> Shreya Sharma
        </p>
        <p className="text-[14px] md:text-[18px] font-light text-[#FFFFFF] mt-4 md:mt-8 mb-4 md:mb-8 text-justify w-full md:w-[731px] font-montserrat">
          We are Graphtique — A Creative Design Studio specializing in Graphic
          Design & UI/UX Design. We help you build powerful visual experiences
          that connect with your audience.
        </p>

        <div className="relative w-[120px] md:w-[175px] h-[40px] md:h-[60px] rounded-[16px] overflow-hidden">
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
            <span className="font-normal font-montserrat text-white text-[18px] md:text-[28px]">
              Hire Us
            </span>
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="absolute top-0 right-0 z-20">
        <Image 
          src="/cover image.svg" 
          alt="Right Side SVG" 
          width={isMobile ? 300 : 525} 
          height={isMobile ? 300 : 525} 
        />
      </div>

      {/* Scrolling Services Bar */}
      <div
        className="fixed bottom-[20px] md:bottom-[40px] left-1/2 w-screen h-[32px] md:h-[48px] bg-[#1c1c1c] origin-center overflow-hidden z-50"
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
              <span className="text-[14px] md:text-[20px] font-montserrat font-medium text-white mx-2 md:mx-4">
                {text}
              </span>
              <Image 
                src="/Soft Star.svg" 
                alt="Star" 
                width={isMobile ? 16 : 24} 
                height={isMobile ? 16 : 24} 
                className="mx-1 md:mx-2" 
              />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Who We Are Section */}
      <div 
        className="relative md:absolute left-4 md:left-18 z-10 w-[90%] mt-[500px] md:mt-0"
        style={{ top: isMobile ? undefined : `${whoWeAreTop}px` }}
      >
        <h2 className="text-[28px] md:text-[44px] font-montserrat font-semibold text-white relative">
          Who We Are?
          <div className="absolute bottom-[-8px] left-0 w-full flex">
            <span className="h-[2.5px] bg-white rounded-sm" style={{ width: '95%' }}></span>
            <span className="h-[2.5px] bg-white rounded-sm" style={{ width: '10%', marginLeft: '4px' }}></span>
            <span className="h-[2.5px] bg-white rounded-sm" style={{ width: '5%', marginLeft: '4px' }}></span>
            <span className="h-[2.5px] bg-white rounded-sm" style={{ width: '3%', marginLeft: '4px' }}></span>
          </div>
        </h2>
      </div>
      <div className="absolute left-4 md:left-12 mt-[600px] md:mt-[900px] z-10 flex flex-col md:flex-row items-start gap-4 md:gap-12 w-[90%]">
        {!isMobile && (
          <div className="flex-shrink-0">
            <Image 
              className="mt-[-50]" 
              src="/Who Section.svg" 
              alt="About Graphtique" 
              width={330} 
              height={330}
            />
          </div>
        )}
        <p className="text-white font-montserrat text-[16px] md:text-[26px] font-normal leading-relaxed text-justify w-full md:w-[725px] md:ml-10">
          Graphtique is a creative design studio founded by Shreya Sharma, a passionate 
          designer dedicated to crafting exceptional visual experiences. We
          specialize in Graphic Design and UI/UX Design, working with businesses
          worldwide to bring their ideas to life.
        </p>
      </div>

      {/* Counter Section */}
      <div 
        id="counter-section" 
        className="relative md:absolute left-1/2 transform -translate-x-1/2 z-10 w-full max-w-full px-4 mt-[100px] md:mt-0"
        style={{ top: isMobile ? undefined : `${counterTop}px` }}
      >
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-28">
          <div className="flex flex-col items-center">
            <span 
              className="text-[48px] md:text-[76px] font-alfa-slab-one"
              style={{
                background: "linear-gradient(-24deg, #981C82 0%, #ED6D65 56%, #B07900 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent"
              }}
            >
              {yearsCount}+
            </span>
            <p className="text-[16px] md:text-[24px] font-montserrat font-medium text-[#9F9F9F] text-center">
              Years of Design <br/> Experience
            </p>
          </div>
          <div className="w-56 h-[2px] md:h-56 md:w-[2px] bg-[#585858]"></div>
          <div className="flex flex-col items-center">
            <span 
              className="text-[48px] md:text-[76px] font-alfa-slab-one"
              style={{
                background: "linear-gradient(-24deg, #981C82 0%, #ED6D65 56%, #B07900 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent"
              }}
            >
              {customersCount}+
            </span>
            <p className="text-[16px] md:text-[24px] font-montserrat font-medium text-[#9F9F9F] text-center">
              Overall Global<br />Customers
            </p>
          </div>
          <div className="w-56 h-[2px] md:h-56 md:w-[2px] bg-[#585858]"></div>
          <div className="flex flex-col items-center">
            <span 
              className="text-[48px] md:text-[76px] font-alfa-slab-one mb-4 md:mb-10"
              style={{
                background: "linear-gradient(-24deg, #981C82 0%, #ED6D65 56%, #B07900 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent"
              }}
            >
              {projectsCount}+
            </span>
            <p className="text-[16px] md:text-[24px] font-montserrat font-medium text-[#9F9F9F]">
              Overall Projects
            </p>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div 
        className="relative md:absolute left-0 z-10 w-full px-4 md:px-12 mt-[100px] md:mt-0"
        style={{ top: isMobile ? undefined : `${projectsTop}px` }}
      >
        <h2 className="text-[28px] md:text-[44px] font-montserrat font-semibold text-white relative">
          Projects
          <div className="absolute bottom-[-8px] left-0 w-[150px] md:w-[200px] flex">
            <span className="h-[2.5px] bg-white rounded-sm" style={{ width: '95%' }}></span>
            <span className="h-[2.5px] bg-white rounded-sm" style={{ width: '10%', marginLeft: '4px' }}></span>
            <span className="h-[2.5px] bg-white rounded-sm" style={{ width: '5%', marginLeft: '4px' }}></span>
            <span className="h-[2.5px] bg-white rounded-sm" style={{ width: '3%', marginLeft: '4px' }}></span>
          </div>
        </h2>

        <div className="mt-8 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
          {/* Project 1 */}
          <a href="/project1" className="group">
            <div className="h-[200px] md:h-[300px] bg-[#1c1c1c] rounded-[16px] p-4 md:p-6 flex flex-col items-center justify-center transition-all hover:scale-105">
              <div className="mb-4 md:mb-6 w-[80px] h-[80px] md:w-[120px] md:h-[120px] flex items-center justify-center">
                <Image src="/medicons.svg" alt="Medicons" width={isMobile ? 80 : 120} height={isMobile ? 80 : 120} className="object-contain" />
              </div>
              <h3 className="text-[20px] md:text-[28px] font-montserrat font-semibold text-center text-transparent bg-clip-text"
                style={{
                  backgroundImage: 'linear-gradient(-24deg, #981C82 0%, #ED6D65 56%, #B07900 100%)'
                }}>
                Medicons
              </h3>
              <p className="text-[14px] md:text-[18px] font-montserrat font-light text-center text-[#FFFFFF] mt-1 md:mt-2">
                Healthcare Branding
              </p>
            </div>
          </a>

          {/* Project 2 */}
          <a href="/project2" className="group">
            <div className="h-[200px] md:h-[300px] bg-[#1c1c1c] rounded-[16px] p-4 md:p-6 flex flex-col items-center justify-center transition-all hover:scale-105">
              <div className="mb-4 md:mb-6 w-[80px] h-[80px] md:w-[120px] md:h-[120px] flex items-center justify-center">
                <Image src="/instagiftify.svg" alt="Instagiftify" width={isMobile ? 80 : 120} height={isMobile ? 80 : 120} className="object-contain" />
              </div>
              <h3 className="text-[20px] md:text-[28px] font-montserrat font-semibold text-center text-transparent bg-clip-text"
                style={{
                  backgroundImage: 'linear-gradient(-24deg, #981C82 0%, #ED6D65 56%, #B07900 100%)'
                }}>
                Instagiftify
              </h3>
              <p className="text-[14px] md:text-[18px] font-montserrat font-light text-center text-[#FFFFFF] mt-1 md:mt-2">
                Social Media Platform
              </p>
            </div>
          </a>

          {/* Project 3 */}
          <a href="/project3" className="group">
            <div className="h-[200px] md:h-[300px] bg-[#1c1c1c] rounded-[16px] p-4 md:p-6 flex flex-col items-center justify-center transition-all hover:scale-105">
              <div className="mb-4 md:mb-6 w-[80px] h-[80px] md:w-[120px] md:h-[120px] flex items-center justify-center">
                <Image src="/TAI.svg" alt="TAI" width={isMobile ? 80 : 120} height={isMobile ? 80 : 120} className="object-contain" />
              </div>
              <h3 className="text-[20px] md:text-[28px] font-montserrat font-semibold text-center text-transparent bg-clip-text"
                style={{
                  backgroundImage: 'linear-gradient(-24deg, #981C82 0%, #ED6D65 56%, #B07900 100%)'
                }}>
                TAI
              </h3>
              <p className="text-[14px] md:text-[18px] font-montserrat font-light text-center text-[#FFFFFF] mt-1 md:mt-2">
                Technology Solutions
              </p>
            </div>
          </a>

          {/* Project 4 */}
          <a href="/project4" className="group mt-4 md:mt-8">
            <div className="h-[200px] md:h-[300px] bg-[#1c1c1c] rounded-[16px] p-4 md:p-6 flex flex-col items-center justify-center transition-all hover:scale-105">
              <div className="mb-4 md:mb-6 w-[80px] h-[80px] md:w-[120px] md:h-[120px] flex items-center justify-center">
                <Image src="/OMA Udyog.svg" alt="OMA Udyog" width={isMobile ? 80 : 120} height={isMobile ? 80 : 120} className="object-contain" />
              </div>
              <h3 className="text-[20px] md:text-[28px] font-montserrat font-semibold text-center text-transparent bg-clip-text"
                style={{
                  backgroundImage: 'linear-gradient(-24deg, #981C82 0%, #ED6D65 56%, #B07900 100%)'
                }}>
                OMA Udyog
              </h3>
              <p className="text-[14px] md:text-[18px] font-montserrat font-light text-center text-[#FFFFFF] mt-1 md:mt-2">
                Manufacturing
              </p>
            </div>
          </a>

          {/* Project 5 */}
          <a href="/project5" className="group mt-4 md:mt-8">
            <div className="h-[200px] md:h-[300px] bg-[#1c1c1c] rounded-[16px] p-4 md:p-6 flex flex-col items-center justify-center transition-all hover:scale-105">
              <div className="mb-4 md:mb-6 w-[80px] h-[80px] md:w-[120px] md:h-[120px] flex items-center justify-center">
                <Image src="/Chica Loca.svg" alt="Chica Loca" width={isMobile ? 80 : 120} height={isMobile ? 80 : 120} className="object-contain" />
              </div>
              <h3 className="text-[20px] md:text-[28px] font-montserrat font-semibold text-center text-transparent bg-clip-text"
                style={{
                  backgroundImage: 'linear-gradient(-24deg, #981C82 0%, #ED6D65 56%, #B07900 100%)'
                }}>
                Chica Loca
              </h3>
              <p className="text-[14px] md:text-[18px] font-montserrat font-light text-center text-[#FFFFFF] mt-1 md:mt-2">
                Fashion Brand
              </p>
            </div>
          </a>

          {/* Project 6 */}
          <a href="/project6" className="group mt-4 md:mt-8">
            <div className="h-[200px] md:h-[300px] bg-[#1c1c1c] rounded-[16px] p-4 md:p-6 flex flex-col items-center justify-center transition-all hover:scale-105">
              <div className="mb-4 md:mb-6 w-[80px] h-[80px] md:w-[120px] md:h-[120px] flex items-center justify-center">
                <Image src="/project-placeholder.svg" alt="Project 6" width={isMobile ? 80 : 120} height={isMobile ? 80 : 120} className="object-contain" />
              </div>
              <h3 className="text-[20px] md:text-[28px] font-montserrat font-semibold text-center text-transparent bg-clip-text"
                style={{
                  backgroundImage: 'linear-gradient(-24deg, #981C82 0%, #ED6D65 56%, #B07900 100%)'
                }}>
                Project 6
              </h3>
              <p className="text-[14px] md:text-[18px] font-montserrat font-light text-center text-[#FFFFFF] mt-1 md:mt-2">
                Coming Soon
              </p>
            </div>
          </a>
        </div>
      </div>

      {/* Companies Section */}
      <div 
        className="relative md:absolute left-0 z-10 w-full px-0 mt-[100px] md:mt-0"
        style={{ top: isMobile ? undefined : `${companiesTop}px` }}
      >
        <h2 className="text-[24px] md:text-[44px] font-montserrat font-semibold text-white relative pl-4 md:pl-12">
          Companies We have Worked With
          <div className="absolute bottom-[-8px] left-4 md:left-12 flex w-[200px]">
            <span className="h-[2.5px] bg-white rounded-sm" style={{ width: '95%' }}></span>
            <span className="h-[2.5px] bg-white rounded-sm" style={{ width: '10%', marginLeft: '4px' }}></span>
            <span className="h-[2.5px] bg-white rounded-sm" style={{ width: '5%', marginLeft: '4px' }}></span>
            <span className="h-[2.5px] bg-white rounded-sm" style={{ width: '3%', marginLeft: '4px' }}></span>
          </div>
        </h2>

        <div className="overflow-hidden mt-6 md:mt-12 w-full">
          <div ref={companyRow1Ref} className="flex items-center w-max gap-3 md:gap-6 pl-3 md:pl-6">
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={`row1-${i}`}>
                {["Scintillo","Estilo","Instagiftify","Luxury Aesthetics"].reverse().map((name, j) => (
                  <div
                    key={`${i}-${j}`}
                    className="px-6 py-2 md:px-12 md:py-4 text-[14px] md:text-[24px] font-montserrat text-white text-center rounded-full border-[2px] border-white"
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

        <div className="overflow-hidden mt-4 md:mt-8 w-full">
          <div ref={companyRow2Ref} className="flex items-center w-max gap-3 md:gap-6 pl-3 md:pl-6">
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={`row2-${i}`}>
                {["Luxury Aesthetics","OMA Udyog","Fallovcom","Exotik","Estilo"].reverse().map((name, j) => (
                  <div
                    key={`${i}-${j}`}
                    className="px-6 py-2 md:px-12 md:py-4 text-[14px] md:text-[24px] font-montserrat text-white text-center rounded-full border-[2px] border-white"
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

      {/* Footer Section */}
      <div 
        className="relative md:absolute left-1/2 transform -translate-x-1/2 w-[95%] md:w-[90%] max-w-6xl z-10 mb-20 md:mb-40 mt-[100px] md:mt-0"
        style={{ top: isMobile ? undefined : `${footerTop}px` }}
      >
        <div 
          className="relative rounded-[15px] md:rounded-[25px] p-4 md:p-8 h-[300px] md:h-[400px] mb-10 md:mb-20"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.4) 1%, rgba(255,255,255,0) 100%)',
            border: '1.5px solid white',
          }}
        >
          {!isMobile && (
            <div className="absolute -top-40 left-[-5] z-20">
              <Image
                src="/Footer.svg"
                alt="Footer decoration"
                width={450}
                height={490}
              />
            </div>
          )}

          <div className="md:ml-[640px] pl-0 md:pl-8 border-l-0 md:border-l border-white/30">
            <div className="mb-4 md:mb-6">
              <p className="text-[16px] md:text-[20px] font-montserrat font-semibold text-white mb-1 md:mb-2 text-left md:text-right">
                Professional <br/> Account
              </p>
              <div className="flex flex-col">
                <a 
                  href="https://www.linkedin.com/company/graphtique/" 
                  className="text-[14px] md:text-[20px] font-montserrat font-light text-white hover:underline text-left md:text-right"
                >
                  Graphtique - LinkedIn
                </a>
                <a 
                  href="https://www.instagram.com/graphtique?igsh=YmsyY3NsNHphcW5z" 
                  className="text-[14px] md:text-[20px] font-montserrat font-light text-white hover:underline text-left md:text-right"
                >
                  Graphtique - Instagram
                </a>
              </div>
            </div>

            <div className="mt-4 md:mt-8">
              <p className="text-[16px] md:text-[20px] font-montserrat font-semibold text-white mb-1 md:mb-2 text-left md:text-right">
                Contact Us
              </p>
              <a 
                href="mailto:graphtique165@gmail.com" 
                className="text-[14px] md:text-[20px] font-montserrat font-light text-white hover:underline text-left md:text-right"
              >
                graphtique165@gmail.com
              </a>
            </div>
          </div>

          <div className="border-t border-white/30 w-full mt-8 md:mt-[45px]"></div>

          <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4 md:gap-0">
            <p className="text-[10px] md:text-[12px] font-montserrat font-light text-white">
              © 2025 Graphtique All Rights Reserved
            </p>

            <div className="flex gap-2 md:gap-4">
              <a 
                href="mailto:graphtique165@gmail.com"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Image
                  src="/email (1).png"
                  alt="Email"
                  width={16}
                  height={16}
                  className="w-4 h-4 md:w-5 md:h-5"
                />
              </a>

              <a 
                href="https://www.instagram.com/graphtique?igsh=YmsyY3NsNHphcW5z"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Image
                  src="/instagram.png"
                  alt="Instagram"
                  width={16}
                  height={16}
                  className="w-4 h-4 md:w-5 md:h-5"
                />
              </a>

              <a 
                href="https://www.linkedin.com/company/graphtique/"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Image
                  src="/linkedin.png"
                  alt="LinkedIn"
                  width={16}
                  height={16}
                  className="w-4 h-4 md:w-5 md:h-5"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}