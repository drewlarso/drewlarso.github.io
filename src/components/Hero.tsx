export default function Hero() {
    return (
        <section
            id="about"
            className="flex flex-col items-center justify-center h-[60vh] w-full"
        >
            <div className="flex flex-col items-center  bg-gradient-to-br from-violet-200 to-violet-600 bg-clip-text text-transparent">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
                    Drew Larson
                </h1>
                <h1 className="text-xl sm:text-2xl md:text-3xl mt-4">
                    Software Engineer
                </h1>
            </div>
        </section>
    )
}
