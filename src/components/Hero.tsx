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
                <h1 className="text-md sm:text-xl md:text-2xl mt-4 font-medium loaded mb-8">
                    Software Engineering Student
                </h1>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-violet-400 to-transparent"></div>
            </div>
            <h1
                className={`text-sm sm:text-base md:text-lg lg:text-xl text-center text-violet-200 mt-8 font-medium max-w-2xl mx-auto px-4 leading-relaxed transform transition-all duration-1000 delay-300 ${
                    isLoaded
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-10 opacity-0'
                }`}
            >
                Building the bridge between imagination and creation. I'm
                passionate about making software that people love to use.
            </h1>
            <div
                className={`flex flex-row justify-center items-center gap-4  transform transition-all duration-1000 delay-500 ${
                    isLoaded
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-5 opacity-0'
                }`}
            >
                <button className="mt-16 font-mediumtransition-all duration-200 backdrop-blur-sm p-1 rounded-xl overflow-hidden hover:scale-110">
                    <a href="https://www.github.com/drewlarso" target="_blank">
                        <img src="github.svg" width={42}></img>
                    </a>
                </button>
                <button className="mt-16 font-mediumtransition-all duration-200 backdrop-blur-sm p-1 rounded-xl overflow-hidden hover:scale-110">
                    <a
                        href="https://www.linkedin.com/in/drew-larson-329746325/"
                        target="_blank"
                    >
                        <img src="linkedin.svg" width={48}></img>
                    </a>
                </button>
            </div>
            <p
                className={`absolute bottom-32 font-bold text-3xl mt-8 transform transition-all duration-1000 delay-500 animate-bounce ${
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
