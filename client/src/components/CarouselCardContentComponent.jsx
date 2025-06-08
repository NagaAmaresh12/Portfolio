import React, { Suspense } from 'react';
import Projects from './Projects';
import Loader from './Loader';
const About = React.lazy(() => import('./About'));
const Contact = React.lazy(() => import('./Contact'));
const Home = React.lazy(() => import('./Home'));



const CarouselCardContentComponent = React.memo(({ id, item }) => {
    const renderComponent = () => {
        switch (item.component) {
            case "home": return <Suspense fallback={<Loader />}><Home /></Suspense>;
            case "project": return <Suspense fallback={<Loader />}><Projects item={item} /></Suspense>;
            case "about": return <Suspense fallback={<Loader />}>  <About /></Suspense>;
            case "contact": return <Suspense fallback={<Loader />}>  <Contact /></Suspense>;
            default: return null;
        }
    };
    CarouselCardContentComponent.displayName = "CarouselCardContentComponent";
    return (
        <div className='flex items-center justify-center h-[85vh] w-screen'>
            {renderComponent()}
        </div>
    )

})

export default CarouselCardContentComponent;
