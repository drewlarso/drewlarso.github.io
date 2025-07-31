export default function Hero() {
    return (
        <section
            id="about"
            className="flex flex-col items-center justify-center min-h-dvh w-full"
        >
            <div className="flex flex-col items-center bg-gradient-to-br from-violet-200 to-violet-600 bg-clip-text text-transparent">
                <h1
                    className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-center animate-bob-1`}
                >
                    Drew Larson
                </h1>

                <h1
                    className={`text-md sm:text-xl md:text-2xl mt-6 font-medium loaded animate-bob-2 mb-6`}
                >
                    Software Engineering Student
                </h1>
            </div>
            <h1 className="text-md sm:text-lg md:text-xl text-center mt-6 font-medium min-w-[50%] w-xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam
            </h1>
            <div className="flex flex-row justify-center items-center gap-4">
                <button className="mt-16 font-medium bg-violet-600/80 hover:bg-violet-600 transition-colors duration-200 border-2 border-violet-600/20 backdrop-blur-sm py-2 px-3 rounded-4xl">
                    My Projects
                </button>
                <button className="mt-16 font-medium bg-violet-600/80 hover:bg-violet-600 transition-colors duration-200 border-2 border-violet-600/40 backdrop-blur-sm py-2 px-3 rounded-4xl">
                    Contact Me
                </button>
            </div>
            <p className="mt-16">v</p>
        </section>
    )
}
