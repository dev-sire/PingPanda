import Image from "next/image"
import { Star } from "lucide-react"

import { cn } from "@/utils"
import type { Testimonial } from "@/lib/testimonials"

const initials = (name: string) =>
    name
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()

const TestimonialCard = ({ testimonial, hidden }: { testimonial: Testimonial; hidden?: boolean }) => {
    const rating = testimonial.rating ?? 5

    return (
        <figure
            aria-hidden={hidden || undefined}
            className="flex w-[300px] shrink-0 flex-col justify-between rounded-2xl border border-gray-200 bg-brand-25 p-6 shadow-sm sm:w-[400px]"
        >
            <div>
                <div className="mb-3 flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            className={cn(
                                "size-4",
                                i < rating ? "fill-brand-600 text-brand-600" : "text-gray-300"
                            )}
                        />
                    ))}
                </div>
                <blockquote className="text-pretty text-base/7 font-medium tracking-tight text-brand-950 sm:text-lg/8">
                    “{testimonial.quote}”
                </blockquote>
            </div>

            <figcaption className="mt-5 flex items-center gap-3 border-t border-gray-200 pt-4">
                {testimonial.avatar ? (
                    <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={44}
                        height={44}
                        className="size-11 rounded-full object-cover"
                    />
                ) : (
                    <span
                        aria-hidden
                        className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-200 text-sm font-semibold text-brand-800"
                    >
                        {initials(testimonial.name)}
                    </span>
                )}
                <div className="flex min-w-0 flex-col">
                    <span className="truncate font-semibold">{testimonial.name}</span>
                    <span className="truncate text-sm text-gray-600">{testimonial.role}</span>
                </div>
                <span className="ml-auto shrink-0 rounded-full bg-brand-100 px-2.5 py-1 text-xs font-medium text-brand-700">
                    {testimonial.useCase}
                </span>
            </figcaption>
        </figure>
    )
}

export const TestimonialSlider = ({
    testimonials,
    className,
    secondsPerCard = 9,
}: {
    testimonials: Testimonial[]
    className?: string
    /** Lower is faster. */
    secondsPerCard?: number
}) => {
    // Two copies side by side: the track slides by exactly one copy, then loops seamlessly.
    const loop = [...testimonials, ...testimonials]
    const hasPlaceholders = testimonials.some((t) => t.placeholder)

    return (
        <div className={cn("w-full", className)}>
            <div
                style={{
                    maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                    WebkitMaskImage:
                        "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                }}
                className="relative flex w-full max-w-full overflow-hidden"
            >
                <div
                    // Inline on purpose: it keeps sliding even if the OS asks apps to reduce motion
                    // (a slow marquee that pauses on hover/focus), and never depends on Tailwind config.
                    style={{ animation: `x-slider ${testimonials.length * secondsPerCard}s linear infinite` }}
                    className="flex w-max gap-5 py-2 hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]"
                >
                    {loop.map((testimonial, index) => (
                        <TestimonialCard
                            key={index}
                            testimonial={testimonial}
                            hidden={index >= testimonials.length}
                        />
                    ))}
                </div>
            </div>

            {hasPlaceholders ? (
                <p className="mt-6 px-4 text-center text-xs text-gray-500">
                    Sample testimonials shown until customer reviews arrive.
                </p>
            ) : null}
        </div>
    )
}
