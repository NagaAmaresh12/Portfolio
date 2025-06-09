import { Megaphone } from 'lucide-react';
import React from 'react';

const Projects = ({ item }) => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-between text-white">
            <div style={{ marginTop: 80 }} className="text-4xl font-bold">
                {item?.title}
            </div>

            <div className="h-1/3 w-full flex flex-col items-center justify-start">
                <h5 style={{ marginTop: 20, marginBottom: 30 }} className="lg:text-6xl text-3xl">
                    {item?.projectName}
                </h5>

                <h5
                    style={{ paddingLeft: 10, paddingRight: 10 }}
                    className="text-xl h-16 text-black bg-white rounded-md flex items-center justify-center gap-4 hover:cursor-pointer"
                >
                    <a href={item?.projectCard?.link || "#"} target="_blank" rel="noopener noreferrer">
                        {
                            item?.projectCard?.image ? (
                                <img
                                    src={item.projectCard.image}
                                    alt={item?.content || "Project Image"}
                                    className="h-12 w-12 rounded-md"
                                />
                            ) : (
                                <Megaphone className="h-12 w-12" />
                            )
                        }
                    </a>
                    <span>
                        {item?.projectCard?.link ? item?.projectCard?.title : item?.projectCard?.status}
                    </span>
                </h5>
            </div>
        </div>
    );
};

export default Projects;
