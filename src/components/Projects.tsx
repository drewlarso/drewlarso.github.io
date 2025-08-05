import ProjectCard from './ProjectCard'

export default function Projects() {
    return (
        <section
            id="projects"
            className="w-full flex flex-col justify-center items-center scroll-mt-24"
        >
            <h1 className="text-4xl my-8">Projects</h1>
            <div className="flex flex-wrap justify-center gap-6 p-4">
                <ProjectCard
                    img="/bg.png"
                    title="Test1"
                    description="description for test 1"
                />
                <ProjectCard
                    img="/github.svg"
                    title="Test2"
                    description="description for test 2description for test 2description for test 2description for test 2description for test 2description for test 2description for test 2"
                />
                <ProjectCard
                    img="/linkedin.svg"
                    title="Test3"
                    description="description for test 3 description for test 3 description for test 3 description for test 3 description for test 3"
                />
            </div>
        </section>
    )
}
