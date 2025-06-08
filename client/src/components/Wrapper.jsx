import React, { lazy, Suspense } from 'react';
import Header from './Header.jsx';
import { Progress } from '../components/ui/progress.jsx';
import { useCarouselContext } from '../context/contextProvider.jsx';

// ✅ Lazy load heavy components
const CarouselDemo = lazy(() => import('./CarouselDemo.jsx'));
const BlobScene = lazy(() => import('../components/BlobScene.jsx'));
const Loader = lazy(() => import('./Loader.jsx'));

export default function Wrapper() {
    const { backgroundColor, progress, show3D, loading, setShowGui, showGui } = useCarouselContext();

    return (
        <div style={{ background: backgroundColor }} className="h-screen w-full text-white">
            <div className="h-[10vh] w-full absolute left-0 top-0 z-30">
                <Header />
            </div>

            <div style={{ paddingTop: '10vh' }} className="h-[95vh] w-full relative">
                {show3D && (
                    <div className="absolute inset-0 z-0">
                        <Suspense fallback={null}>
                            <BlobScene />
                        </Suspense>
                    </div>
                )}

                <Suspense fallback={<div className="text-center absolute left-1/2 top-1/2 z-10">Loading Carousel...</div>}>
                    {loading ? <Loader /> : <CarouselDemo />}
                </Suspense>
            </div>

            <div className="flex h-[5vh] w-full items-center justify-center relative">
                {show3D && (
                    <button
                        className="transition delay-250 scale-105 absolute lg:right-[2vw] lg:bottom-[2vw] h-22 w-22 rounded-full bg-black hidden md:block" onClick={() => setShowGui(!showGui)}
                    >
                        Play
                    </button>
                )}
                <Progress value={progress} className="w-[20%] bg-zinc-300" />
            </div>
        </div>
    );
}
