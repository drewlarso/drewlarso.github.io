import { useState } from 'react'

export default function Navbar() {
    const [active, setActive] = useState<string>('About')

    const links = [
        { href: '#about', label: 'About' },
        { href: '#skills', label: 'Skills' },
        { href: '#projects', label: 'Projects' },
        { href: '#contact', label: 'Contact' },
    ]

    return (
        <nav className="fixed w-full mx-auto mt-4 z-[1000]">
            <div className="flex flex-row justify-center">
                <ul className="flex flex-row justify-center items-center bg-violet-400/15 border border-violet-300/20 backdrop-blur-lg rounded-4xl p-1.5 text-violet-50 font-medium">
                    {links.map((link) => (
                        <li
                            className="overflow-hidden hover:scale-102 duration-100 px-2"
                            key={link.href}
                        >
                            <a
                                href={link.href}
                                onClick={() => setActive(link.label)}
                                className={`duration-200 hover:text-white text-sm ${
                                    active === link.label
                                        ? 'underline underline-offset-4 decoration-2'
                                        : ''
                                }`}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}
