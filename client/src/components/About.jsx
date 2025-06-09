import React from 'react'
import { FaGithub, FaLinkedin, FaGoogle } from 'react-icons/fa'
import { Button } from '../components/ui/button'

const About = () => {


    return (
        <section style={{ paddingLeft: 20, paddingRight: 20 }} className="relative min-h-screen w-full text-white flex flex-col items-center justify-center">
            <h2 style={{ marginBottom: 20 }} className="text-4xl font-bold  text-center">About Me</h2>

            <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-10 md:gap-20  p-6">
                {/* Profile Picture */}
                <div className="flex justify-center md:justify-start mb-6 md:mb-0">
                    {/* <img
                        src="/images/profile-pic.jpeg"
                        alt="Naga Amaresh"
                        className="h-28 w-28 sm:h-32 sm:w-32 lg:h-40 lg:w-40 -rotate-7 rounded-full border-4 border-white object-cover"
                    /> */}
                    {/* <div className='text-white h-12 w-12 rounded-full overflow-hidden border-3  border-sky-300'>
                                        <img src="/images/profile-pic.jpeg" alt="my-pic" className='rounded-full h-full w-full object-cover' />
                                    </div> */}
                    <div className="h-28 w-28 sm:h-32 sm:w-32 lg:h-40 lg:w-40 -rotate-7 rounded-full border-4 border-white object-cover"></div>
                </div>

                {/* Info */}
                <div className="flex flex-col gap-5 text-sm lg:text-lg leading-relaxed max-w-3xl">
                    <p>
                        Hello! I'm <strong>Naga Amaresh Kanne</strong>, a B.Tech Computer Science graduate from <strong>Presidency University, Bangalore</strong> (2023).
                    </p>
                    <p>
                        I'm a <strong>passionate full-stack developer</strong> focused on building clean, scalable, and performant web applications.
                    </p>

                    <p>I have hands-on experience with technologies:</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { name: "React", src: "https://cdn.simpleicons.org/react/61DAFB" },
                            { name: "Next.js", src: "https://cdn.simpleicons.org/nextdotjs/000000" },
                            { name: "Node.js", src: "https://cdn.simpleicons.org/node.js/339933" },
                            { name: "Express.js", src: "https://cdn.simpleicons.org/express/000000" },
                            { name: "MongoDB", src: "https://cdn.simpleicons.org/mongodb/47A248" },
                            { name: "React Native", src: "https://cdn.simpleicons.org/react/61DAFB" },
                        ].map(({ name, src }) => (
                            <div key={name} className="flex items-center gap-2">
                                <img src={src} alt={name} className="h-8 w-8" />
                                <span className="text-base">{name}</span>
                            </div>
                        ))}
                    </div>

                    <p>
                        I'm constantly learning and pushing myself to grow. Every day ends with new learnings, and I aim to rise and shine like the sun 🌞.
                    </p>

                    {/* Resume Button */}
                    <div className="w-full">
                        <Button
                            asChild
                            className="w-full bg-black text-white hover:bg-gray-800"
                        >
                            <a
                                href="/resume/Resume.pdf"
                                download="Naga_Amaresh_Kanne_Resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Download Resume
                            </a>
                        </Button>
                    </div>

                    {/* Social Links */}
                    <div className="pt-6 flex gap-6 justify-center text-2xl">
                        <a href="https://github.com/NagaAmaresh12" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <FaGithub />
                        </a>
                        <a href="mailto:nagaamareshkanne@gmail.com" aria-label="Gmail">
                            <FaGoogle />
                        </a>
                        <a href="https://linkedin.com/in/kanne-naga-amaresh-a16783279" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <FaLinkedin />
                        </a>
                    </div>
                </div>
            </div>


        </section >
    )
}

export default About
