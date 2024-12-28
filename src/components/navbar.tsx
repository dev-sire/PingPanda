import Link from "next/link";
import { MaxWidthWrapper } from "./max-width-wrapper";
import { SignOutButton } from "@clerk/nextjs";
import { Button, buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";

export const Navbar = async () => {
    const user = await currentUser();

    return(
        <nav className="sticky h-16 z-[100] inset-x-0 top-0 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg transition-all">
            <MaxWidthWrapper>
                <div className="h-16 flex items-center justify-between">
                    <Link href="/" className="flex font-semibold z-40">
                        Ping<span className="text-brand-700">Panda</span>
                    </Link>
                    <div className="flex items-center space-x-4 h-full">
                        {user ? (
                            <>
                                <SignOutButton>
                                    <Button variant="ghost">Sign Out</Button>
                                </SignOutButton>
                                <Link href="/dashboard" className={buttonVariants({
                                    size: "sm",
                                    className: "flex items-center gap-1"
                                })}>
                                    Dashboard <ArrowRight className="ml-1.5 size-4" />
                                </Link>
                            </>
                        ): (
                            <>
                                <Link href="/pricing" className={buttonVariants({
                                    size: "sm",
                                    variant: "ghost"
                                })}>
                                    Pricing
                                </Link>
                                <Link href="/sign-in" className={buttonVariants({
                                    size: "sm",
                                    variant: "ghost"
                                })}>
                                    Sign in
                                </Link>
                                <div className="h-8 w-px bg-gray-200" />
                                <Link href="/sign-up" className={buttonVariants({
                                    size: "sm",
                                    className: "flex items-center gap-1.5"
                                })}>
                                    Sign up <ArrowRight className="ml-1.5 size-4" />
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    )
}