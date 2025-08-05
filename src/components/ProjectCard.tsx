interface ProjectCardProps {
    img: string
    title: string
    description: string
}

export default function ProjectCard(props: ProjectCardProps) {
    return (
        <div className="w-96 h-128 flex-shrink text-center bg-violet-600/15 border border-violet-600/10 rounded-xl font-medium p-4 flex flex-col justify-start items-center">
            <img src={props.img} className="h-[60%] w-full" />
            <h1 className="py-4 text-2xl">{props.title}</h1>
            <p>{props.description}</p>
        </div>
    )
}
