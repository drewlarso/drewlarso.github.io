import React, { useState, useEffect } from 'react'

export default function Hero() {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    return (
        <section
            id="about"
            className="flex flex-col items-center justify-center min-h-dvh w-full"
        >
            <div
                className={`flex flex-col items-center bg-gradient-to-br from-violet-200 to-violet-600 bg-clip-text text-transparent transform transition-all duration-1000 ${
                    isLoaded
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-10 opacity-0'
                }`}
            >
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-center mb-6">
                    Drew Larson
                </h1>
                <h1 className="text-md sm:text-xl md:text-2xl mt-6 font-medium loaded mb-6">
                    Software Engineering Student
                </h1>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-violet-400 to-transparent"></div>
            </div>
            <h1
                className={`text-md sm:text-lg md:text-xl text-center text-violet-200 mt-6 font-medium min-w-[50%] w-xl transform transition-all duration-1000 delay-300 ${
                    isLoaded
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-10 opacity-0'
                }`}
            >
                hellohellohellohellohellohellohellohello libgy is chump
                llohellohellohellohellohello hellohellohellohellohellohellohello
            </h1>
            <div
                className={`flex flex-row justify-center items-center gap-4  transform transition-all duration-1000 delay-500 ${
                    isLoaded
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-5 opacity-0'
                }`}
            >
                <button className="mt-16 font-medium bg-gradient-to-br from-violet-700/80 to-indigo-600/80 hover:from-violet-600/80 hover:to-indigo-500/80 transition-all duration-200 border-2 border-violet-600/20 backdrop-blur-sm py-2 px-3 rounded-4xl overflow-hidden hover:scale-105">
                    <a href="#projects">My Projects</a>
                </button>
                <button className="mt-16 font-medium bg-gradient-to-br from-violet-700/80 to-indigo-600/80 hover:from-violet-600/80 hover:to-indigo-500/80 transition-all duration-200 border-2 border-violet-600/20 backdrop-blur-sm py-2 px-3 rounded-4xl overflow-hidden hover:scale-105">
                    <a href="#contact">Contact Me</a>
                </button>
            </div>
            <p
                className={`absolute bottom-24 font-bold text-3xl mt-16 transform transition-all duration-1000 delay-500 animate-bounce ${
                    isLoaded
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-5 opacity-0'
                }`}
            >
                ↓
            </p>
        </section>
    )
}
