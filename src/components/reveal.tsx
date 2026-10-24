"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "@/utils"

type RevealProps = React.HTMLAttributes<HTMLDivElement> & {
    /** Reveal the direct children one after another instead of the wrapper itself. */
    stagger?: boolean
    /** Extra delay in ms before the reveal starts. */
    delay?: number
}

/**
 * Fades and lifts its content into place the first time it scrolls into view.
 * The animation itself is plain CSS (see .reveal in globals.css); this only
 * flips `data-revealed` once the element is on screen.
 */
export const Reveal = ({ stagger, delay = 0, className, style, children, ...props }: RevealProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const [revealed, setRevealed] = useState(false)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        if (typeof IntersectionObserver === "undefined") {
            setRevealed(true)
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setRevealed(true)
                    observer.disconnect()
                }
            },
            { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
        )
        observer.observe(element)
        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={ref}
            data-revealed={revealed}
            className={cn(stagger ? "reveal-stagger" : "reveal", className)}
            style={{ ["--reveal-delay" as string]: `${delay}ms`, ...style }}
            {...props}
        >
            {children}
        </div>
    )
}
