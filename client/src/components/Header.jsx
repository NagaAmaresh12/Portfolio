import React, { useEffect, useRef } from 'react';
import { Button } from '../components/ui/button.jsx';
import { useCarouselContext } from '../context/contextProvider.jsx';
import { gsap } from 'gsap';

const Header = () => {
    const { scrollTo, activeIndex } = useCarouselContext();
    const profileRef = useRef();

    const updateProfilePosition = () => {
        const profileEl = profileRef.current;
        if (!profileEl) return;

        const isMobile = window.innerWidth < 768;

        if (activeIndex === 4) {
            // About card layout
            gsap.to(profileEl, {
                duration: 0.6,
                ...(isMobile
                    ? {
                        left: '37vw',
                        top: '37vw',
                        width: '27vw',
                        height: '27vw',
                    }
                    : {
                        left: '18vw',
                        top: '13vw',
                        width: '10.5rem',
                        height: '10.5rem',
                    }),
                ease: 'power3.inOut',
            });
        } else {
            // Default nav layout
            gsap.to(profileEl, {
                duration: 0.6,
                ...(isMobile
                    ? {
                        left: '13vw',
                        top: '7vw',
                        width: '10vw',
                        height: '10vw',
                    }
                    : {
                        left: '20.5vw',
                        top: '1vw',
                        width: '3.5vw',
                        height: '3.5vw',
                    }),
                ease: 'power3.inOut',
            });
        }
    };

    useEffect(() => {
        updateProfilePosition(); // Run on activeIndex change
    }, [activeIndex]);

    useEffect(() => {
        // Handle device switch
        const handleResize = () => {
            updateProfilePosition();
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [activeIndex]); // run on screen size + card index

    return (
        <nav style={{ paddingTop: 10 }} className='relative w-full h-full flex items-center justify-center'>
            <div
                style={{ paddingTop: 30, paddingBottom: 30, paddingLeft: 20, paddingRight: 20 }}
                className='lg:w-[60%] w-[80%] lg:h-full  h-[10vw] flex items-center justify-evenly xl:justify-between border bg-white text-black rounded-full'
            >
                <div></div>
                <button
                    style={{ padding: '5px 10px' }}
                    onClick={() => scrollTo(5)}
                    className="rounded-md font-semibold"
                >
                    Contact
                </button>
                <button
                    style={{ padding: '5px 10px' }}
                    className="rounded-md border border-black font-semibold"
                >
                    <a
                        href="/resume/Resume-new.pdf"
                        download="Naga_Amaresh_Kanne_Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Resume
                    </a>
                </button>
            </div>

            {/* Profile Picture */}
            <div
                ref={profileRef}
                className="absolute rounded-full z-50 overflow-hidden"
                style={{
                    // fallback default values before GSAP animates
                    left: '13vw',
                    top: '7vw',
                    width: '10vw',
                    height: '10vw',
                }}
            >
                <img
                    src="/images/profile-pic.jpeg"
                    alt="Naga Amaresh"
                    className="h-full w-full -rotate-7 rounded-full border-4 border-white object-cover"
                />
            </div>
        </nav>
    );
};

export default Header;
