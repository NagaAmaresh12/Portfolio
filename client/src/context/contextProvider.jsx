import React, { createContext, useContext, useRef, useState } from "react"

const CarouselContext = createContext()

export const useCarouselContext = () => useContext(CarouselContext)

export const CarouselProvider = ({ children }) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [backgroundColor, setBackgroundColor] = useState("#75BCC6")
    const [progress, setProgress] = useState(0)
    const carouselApiRef = useRef(null)
    const [show3D, setShow3D] = useState(true)
    const [showGui, setShowGui] = useState(false);
    const [loading, setLoading] = useState(true);
    const meshRef = useRef(null);
    const uniformsRef = useRef(null);
    const materialRef = useRef(null);



    const updateContext = (index, total) => {
        setActiveIndex(index)
        // Customize background color logic per index
        // bgcolors=["#75BCC6","#7600F0","#FDCF8A","#536C9B","#99AAE6","#F186B7"]
        const bgColors = ['#75BCC6', '#7600F0', '#FDCF8A', "#F186B7", "#536C9B", "#99AAE6"]
        // Show 3D only for Home (0), Project1 (1), Project2 (2), Project3 (3)
        const show3DModelForIndex = [true, true, true, true, false, false]

        setBackgroundColor(bgColors[index % bgColors.length])
        setShow3D(show3DModelForIndex[index] || false)

        setBackgroundColor(bgColors[index % bgColors.length])
        setProgress(((index + 1) / total) * 100)
    }
    const setCarouselApi = (api) => {
        carouselApiRef.current = api
    }
    const scrollTo = (index) => {
        if (carouselApiRef.current) {
            carouselApiRef.current.scrollTo(index)
        }
    }
    return (
        <CarouselContext.Provider
            value={{
                activeIndex, backgroundColor, progress, updateContext, setCarouselApi,
                scrollTo,
                show3D,
                loading,
                setLoading,
                setShowGui,
                showGui
            }}
        >
            {children}
        </CarouselContext.Provider>
    )
}
