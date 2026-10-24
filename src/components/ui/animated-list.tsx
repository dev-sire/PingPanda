"use client";

import React, { ReactElement, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";

import { cn } from "@/utils";

// Raise towards 0% to start earlier, lower (e.g. -30%) to start later.
const START_MARGIN = "0px 0px -10% 0px"

export interface AnimatedListProps {
	className?: string;
	children: React.ReactNode;
	delay?: number;
}

export const AnimatedList = React.memo(
	({ className, children, delay = 1000 }: AnimatedListProps) => {
		const ref = useRef<HTMLDivElement>(null)

		// Starts once the list is on screen. A negative bottom margin delays the start
		// (-40% was too late); 0% would fire the moment its top edge peeks in.
		const inView = useInView(ref, { once: true, margin: START_MARGIN })

		const [count, setCount] = useState(0)
		const items = React.Children.toArray(children)
		const total = items.length

		useEffect(() => {
			if (!inView || count >= total) return

			const timer = setTimeout(() => setCount((c) => c + 1), count === 0 ? 400 : delay)
			return () => clearTimeout(timer)
		}, [inView, count, total, delay])

		// Newest first in the DOM; flex-col-reverse shows them oldest-to-newest top-to-bottom.
		const messages = items.slice(0, count).reverse()

		return (
			<div ref={ref} className={cn("flex flex-col-reverse items-center gap-4", className)}>
				<AnimatePresence>
					{messages.map((item) => (
						<AnimatedListItem key={(item as ReactElement).key}>
							{item}
						</AnimatedListItem>
					))}
				</AnimatePresence>
			</div>
		);
	},
);

AnimatedList.displayName = "AnimatedList";

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
	const animations = {
		initial: { scale: 0, opacity: 0 },
		animate: { scale: 1, opacity: 1, originY: 0 },
		exit: { scale: 0, opacity: 0 },
		transition: { type: "spring", stiffness: 350, damping: 40 },
	};

	return (
		<motion.div {...animations} layout className="mx-auto w-full">
			{children}
		</motion.div>
	);
}
