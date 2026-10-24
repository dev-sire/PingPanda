import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Github } from "lucide-react"

import { MaxWidthWrapper } from "./max-width-wrapper"
import { buttonVariants } from "./ui/button"

const GITHUB_URL = "https://github.com/dev-sire/PingPanda"

const columns = [
    {
        title: "Product",
        links: [
            { href: "/#features", label: "Features" },
            { href: "/pricing", label: "Pricing" },
            { href: "/#reviews", label: "Reviews" },
        ],
    },
    {
        title: "Account",
        links: [
            { href: "/sign-in", label: "Sign in" },
            { href: "/sign-up", label: "Sign up" },
            { href: "/dashboard", label: "Dashboard" },
        ],
    },
]

export const Footer = () => {
    return (
        <footer className="relative overflow-hidden bg-gradient-to-b from-white to-brand-50 pt-20">
            {/* Animated waves: each SVG is two identical tiles wide, so sliding it by half loops seamlessly. */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-36 overflow-hidden sm:h-48">
                <svg
                    className="absolute bottom-0 left-0 h-full w-[200%] max-w-none animate-wave will-change-transform motion-reduce:animate-none"
                    viewBox="0 0 2880 200"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0 100C360 20 1080 180 1440 100C1800 20 2520 180 2880 100V200H0Z"
                        className="fill-brand-200/50"
                    />
                </svg>
                <svg
                    className="absolute bottom-0 left-0 h-[80%] w-[200%] max-w-none animate-wave will-change-transform [animation-direction:reverse] [animation-duration:22s] motion-reduce:animate-none"
                    viewBox="0 0 2880 200"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0 120C480 40 960 200 1440 120C1920 40 2400 200 2880 120V200H0Z"
                        className="fill-brand-300/40"
                    />
                </svg>
            </div>

            <MaxWidthWrapper className="relative z-10">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-flex items-center gap-2.5 text-lg font-semibold">
                            <Image
                                src="/brand-asset-profile-picture.png"
                                alt="PingPanda logo"
                                width={36}
                                height={36}
                                className="size-9 rounded-lg shadow-sm"
                            />
                            <span>
                                Ping<span className="text-brand-700">Panda</span>
                            </span>
                        </Link>
                        <p className="mt-4 max-w-sm text-sm/6 text-gray-600">
                            Real-time SaaS insights, delivered to your Discord. Sales, new users, or any other event,
                            the moment it happens.
                        </p>
                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <Link href="/sign-up" className={buttonVariants({ size: "sm", className: "gap-1" })}>
                                Start for free <ArrowRight className="size-4" />
                            </Link>
                            <Link
                                href={GITHUB_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="PingPanda on GitHub"
                                className={buttonVariants({ size: "sm", variant: "outline", className: "gap-2" })}
                            >
                                <Github className="size-4" /> GitHub
                            </Link>
                        </div>
                    </div>

                    {columns.map((column) => (
                        <div key={column.title}>
                            <h3 className="mb-4 text-sm font-semibold text-brand-950">{column.title}</h3>
                            <nav className="space-y-2.5 text-sm">
                                {column.links.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="block text-gray-600 transition-colors hover:text-brand-700"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    ))}
                </div>

                <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-brand-200/70 py-8 text-center text-sm text-gray-600 sm:flex-row sm:text-left">
                    <p>&copy; {new Date().getFullYear()} PingPanda. All rights reserved.</p>
                    <p>
                        Built with ❤️ by Aman Shahid. Contribute on{" "}
                        <Link
                            href={GITHUB_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-brand-700 hover:underline"
                        >
                            GitHub
                        </Link>
                    </p>
                </div>
            </MaxWidthWrapper>
        </footer>
    )
}
