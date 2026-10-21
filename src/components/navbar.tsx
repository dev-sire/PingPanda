import Link from "next/link";
import Image from "next/image";
import { MaxWidthWrapper } from "./max-width-wrapper";
import { UserButton } from "@clerk/nextjs";
import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";

export const Navbar = async () => {
    const user = await currentUser();

    return(
        <nav className="sticky h-16 z-[100] inset-x-0 top-0 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg transition-all">
            <MaxWidthWrapper>
                <div className="h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2.5 text-lg font-semibold z-40">
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
                    <div className="flex items-center space-x-4 h-full">
                        {user ? (
                            <>
                                <Link href="/dashboard" className={buttonVariants({
                                    size: "sm",
                                    className: "flex items-center gap-1"
                                })}>
                                    Dashboard <ArrowRight className="ml-1.5 size-4" />
                                </Link>
                                {/* Fixed-size slot so the layout doesn't jump while Clerk loads the avatar */}
                                <div className="size-8 shrink-0 rounded-full bg-brand-100 ring-1 ring-brand-200">
                                    <UserButton appearance={{ elements: { avatarBox: "size-8" } }} />
                                </div>
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