export default function Navbar() {
    return (
        <nav className="fixed w-full mx-auto mt-4">
            <div className="flex flex-row justify-center">
                <ul className="flex flex-row justify-center items-center backdrop-blur-lg rounded-4xl p-1 text-violet-200">
                    <li className="p-2">
                        <a
                            href="#about"
                            className="duration-100 hover:text-violet-100"
                        >
                            About
                        </a>
                    </li>
                    <li className="p-2">
                        <a
                            href="#skills"
                            className="duration-100 hover:text-violet-100"
                        >
                            Skills
                        </a>
                    </li>
                    <li className="p-2">
                        <a
                            href="#projects"
                            className="duration-100 hover:text-violet-100"
                        >
                            Projects
                        </a>
                    </li>
                    <li className="p-2">
                        <a
                            href="#contact"
                            className="duration-100 hover:text-violet-100"
                        >
                            Contact
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
