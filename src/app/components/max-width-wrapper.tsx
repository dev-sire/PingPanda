import { cn } from "@/utils";

interface MaxWidthWrapperProps {
    className?: string;
    children: React.ReactNode;
}

export const MaxWidthWrapper = ({className, children}: MaxWidthWrapperProps) => {
    return(
        <div className={cn("h-full mx-auto w-full max-w-screen-xl px-2.5 md:px-20", className)}>
            {children}
        </div>
    )
}