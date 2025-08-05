export default function Skills() {
    const languages = [
        'Typescript',
        'Python',
        'Lua',
        'C++',
        'MySQL',
        'GDScript',
    ]
    const web = ['React', 'Tailwind', 'Flask', 'WebGL', 'ThreeJS']
    const game = [
        'Godot',
        'Phaser',
        'Gamemaker',
        'Roblox Studio',
        'Love2D',
        'Blender',
    ]

    return (
        <section
            id="skills"
            className="flex flex-col justify-center items-center my-16 scroll-mt-32"
        >
            <h1 className="text-4xl">My Skills</h1>
            <h1 className="text-2xl mt-16 mb-6">Languages</h1>
            <div className="flex flex-wrap gap-3 justify-center">
                {languages.map((skill) => (
                    <p className="py-1 px-2 bg-violet-600/45 border border-violet-600/60 rounded-xl font-medium">
                        {skill}
                    </p>
                ))}
            </div>
            <h1 className="text-2xl mt-16 mb-6">Web Development</h1>
            <div className="flex flex-wrap gap-3 justify-center">
                {web.map((skill) => (
                    <p className="py-1 px-2 bg-violet-600/45 border border-violet-600/60 rounded-xl font-medium">
                        {skill}
                    </p>
                ))}
            </div>
            <h1 className="text-2xl mt-16 mb-6">Game Development</h1>
            <div className="flex flex-wrap gap-3 justify-center">
                {game.map((skill) => (
                    <p className="py-1 px-2 bg-violet-600/45 border border-violet-600/60 rounded-xl font-medium">
                        {skill}
                    </p>
                ))}
            </div>
        </section>
    )
}
