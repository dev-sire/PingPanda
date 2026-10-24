"use client"

import Link from "next/link"
import Image from "next/image"
import { UserButton } from "@clerk/nextjs"
import { Activity, ArrowRight, BellRing, Braces, Plug, type LucideIcon } from "lucide-react"

import { cn } from "@/utils"
import { MaxWidthWrapper } from "./max-width-wrapper"
import { buttonVariants } from "./ui/button"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "./ui/navigation-menu"
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "./ui/popover"

type NavbarUser = { imageUrl: string; name: string } | null

const featureLinks: { href: string; label: string; description: string; icon: LucideIcon }[] = [
    {
        href: "/#feature-realtime",
        label: "Real-time notifications",
        description: "Know the moment something happens, wherever you are.",
        icon: BellRing,
    },
    {
        href: "/#feature-events",
        label: "Track any event",
        description: "Signups, payments, quota alerts: anything in your SaaS.",
        icon: Activity,
    },
    {
        href: "/#feature-properties",
        label: "Custom properties",
        description: "Attach emails, amounts or any data you like to an event.",
        icon: Braces,
    },
    {
        href: "/#feature-integration",
        label: "Easy integration",
        description: "One API call from any language. Live in minutes.",
        icon: Plug,
    },
]

const linkStyle = cn(
    navigationMenuTriggerStyle(),
    "bg-transparent text-gray-600 hover:bg-brand-50 hover:text-brand-700 focus:bg-brand-50 data-[active]:bg-brand-50"
)

const MobileLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <PopoverClose asChild>
        <Link
            href={href}
            className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-700"
        >
            {children}
        </Link>
    </PopoverClose>
)

const UserAvatar = ({ imageUrl, name }: { imageUrl: string; name: string }) => (
    <div className="relative size-9 shrink-0 rounded-full shadow-sm ring-2 ring-brand-200">
        {/* The photo is known on the server, so it's visible straight away, before Clerk's JS has loaded. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
            src={imageUrl}
            alt={name}
            className="absolute inset-0 size-full rounded-full object-cover"
        />
        {/* Clerk's button sits on top and adds the account menu (manage account, sign out). */}
        <div className="absolute inset-0 rounded-full">
            <UserButton
                appearance={{
                    elements: {
                        rootBox: "size-9",
                        userButtonTrigger: "rounded-full",
                        avatarBox: "size-9",
                    },
                }}
            />
        </div>
    </div>
)

export const NavbarMenu = ({ user }: { user: NavbarUser }) => {
    return (
        <header className="sticky inset-x-0 top-0 z-[100] h-16 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg transition-all">
            <MaxWidthWrapper>
                <div className="flex h-16 items-center justify-between gap-4">
                    {/* Left side */}
                    <div className="flex items-center gap-2">
                        {/* Mobile menu */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <button
                                    type="button"
                                    aria-label="Open menu"
                                    className="group inline-flex size-9 items-center justify-center rounded-md text-gray-700 transition-colors hover:bg-brand-50 md:hidden"
                                >
                                    <svg
                                        className="pointer-events-none"
                                        width={16}
                                        height={16}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M4 12L20 12"
                                            className="origin-center -translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                                        />
                                        <path
                                            d="M4 12H20"
                                            className="origin-center transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                                        />
                                        <path
                                            d="M4 12H20"
                                            className="origin-center translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                                        />
                                    </svg>
                                </button>
                            </PopoverTrigger>
                            <PopoverContent align="start" className="w-64 p-2 md:hidden">
                                <nav className="flex flex-col">
                                    <MobileLink href="/">Home</MobileLink>
                                    <div className="px-3 pb-1 pt-3 text-xs font-medium text-gray-500">Features</div>
                                    {featureLinks.map((item) => (
                                        <MobileLink key={item.href} href={item.href}>
                                            {item.label}
                                        </MobileLink>
                                    ))}
                                    <div role="separator" className="-mx-2 my-2 h-px bg-border" />
                                    <MobileLink href="/pricing">Pricing</MobileLink>
                                    <MobileLink href="/#reviews">Reviews</MobileLink>
                                    {!user ? <MobileLink href="/sign-in">Sign in</MobileLink> : null}
                                </nav>
                            </PopoverContent>
                        </Popover>

                        {/* Logo */}
                        <Link href="/" className="z-40 mr-2 flex items-center gap-2.5 text-lg font-semibold">
                            <Image
                                src="/brand-asset-profile-picture.png"
                                alt="PingPanda logo"
                                width={36}
                                height={36}
                                priority
                                className="size-9 rounded-lg shadow-sm"
                            />
                            <span>
                                Ping<span className="text-brand-700">Panda</span>
                            </span>
                        </Link>

                        {/* Desktop menu */}
                        <div className="max-md:hidden">
                            <NavigationMenu>
                                <NavigationMenuList>
                                    <NavigationMenuItem>
                                        <NavigationMenuLink asChild>
                                            <Link href="/" className={linkStyle}>
                                                Home
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>

                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger className="bg-transparent text-gray-600 hover:bg-brand-50 hover:text-brand-700 focus:bg-brand-50 data-[state=open]:bg-brand-50 data-[state=open]:text-brand-700">
                                            Features
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <div className="grid w-[540px] gap-2 p-3 md:grid-cols-[0.9fr_1.1fr]">
                                                <NavigationMenuLink asChild>
                                                    <Link
                                                        href={user ? "/dashboard" : "/sign-up"}
                                                        className="flex h-full flex-col justify-end rounded-lg bg-gradient-to-b from-brand-700 to-brand-900 p-5 text-white no-underline outline-none transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-brand-400"
                                                    >
                                                        <Image
                                                            src="/brand-asset-profile-picture.png"
                                                            alt=""
                                                            width={40}
                                                            height={40}
                                                            className="mb-3 size-10 rounded-lg ring-1 ring-white/30"
                                                        />
                                                        <div className="text-base font-semibold">PingPanda</div>
                                                        <p className="mt-1 text-sm leading-snug text-brand-100">
                                                            Real-time SaaS insights, delivered to your Discord.
                                                        </p>
                                                        <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium">
                                                            {user ? "Open dashboard" : "Start for free"}
                                                            <ArrowRight className="size-4" />
                                                        </span>
                                                    </Link>
                                                </NavigationMenuLink>

                                                <ul className="grid gap-1">
                                                    {featureLinks.map((item) => (
                                                        <li key={item.href}>
                                                            <NavigationMenuLink asChild>
                                                                <Link
                                                                    href={item.href}
                                                                    className="flex select-none items-start gap-3 rounded-lg p-3 no-underline outline-none transition-colors hover:bg-brand-50 focus:bg-brand-50"
                                                                >
                                                                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                                                                        <item.icon className="size-4" aria-hidden="true" />
                                                                    </span>
                                                                    <span className="space-y-1">
                                                                        <span className="block text-sm font-medium leading-none text-brand-950">
                                                                            {item.label}
                                                                        </span>
                                                                        <span className="line-clamp-2 block text-sm leading-snug text-gray-600">
                                                                            {item.description}
                                                                        </span>
                                                                    </span>
                                                                </Link>
                                                            </NavigationMenuLink>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>

                                    <NavigationMenuItem>
                                        <NavigationMenuLink asChild>
                                            <Link href="/pricing" className={linkStyle}>
                                                Pricing
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>

                                    <NavigationMenuItem>
                                        <NavigationMenuLink asChild>
                                            <Link href="/#reviews" className={linkStyle}>
                                                Reviews
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-2">
                        {user ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    className={buttonVariants({ size: "sm", className: "gap-1" })}
                                >
                                    Dashboard <ArrowRight className="size-4" />
                                </Link>
                                <UserAvatar imageUrl={user.imageUrl} name={user.name} />
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/sign-in"
                                    className={cn(buttonVariants({ size: "sm", variant: "ghost" }), "max-sm:hidden")}
                                >
                                    Sign in
                                </Link>
                                <Link
                                    href="/sign-up"
                                    className={buttonVariants({ size: "sm", className: "gap-1" })}
                                >
                                    Sign up <ArrowRight className="size-4" />
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </MaxWidthWrapper>
        </header>
    )
}
