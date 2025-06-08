import React, { useEffect, useState, Suspense } from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,

} from "./ui/carousel"
const CarouselCardContentComponent = React.lazy(() => import("./CarouselCardContentComponent.jsx"));
import { data } from "../lib/data.js"
import { useCarouselContext } from "../context/contextProvider.jsx"
import Loader from "./Loader.jsx";

export default function CarouselDemo() {
    const [api, setApi] = useState(null)
    const { updateContext, setCarouselApi } = useCarouselContext()
    useEffect(() => {
        if (!api) return;
        setCarouselApi(api);

        const update = () => {
            const index = api.selectedScrollSnap();
            updateContext(index, data.length);
        };

        update(); // Set initial index
        api.on("select", update);

        return () => {
            api?.off("select", update); // ✅ Cleanup
        };
    }, [api]);


    return (
        <Carousel setApi={setApi} opts={{ loop: true }} className="relative">
            <CarouselContent>
                {data.map((item, index) => (
                    <CarouselItem key={item.id}>
                        <div className="p-1">
                            <div className="p-0">
                                <div
                                    className={`flex h-[85vh] w-full items-center justify-center transition-all duration-300 `}
                                >
                                    <Suspense fallback={<Loader />}>
                                        <CarouselCardContentComponent id={index} item={item} />
                                    </Suspense>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>


        </Carousel>
    )
}
