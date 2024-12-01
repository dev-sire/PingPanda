import { Heading } from "@/components/heading";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Check, Star, StarHalf } from "lucide-react";
import { ShinyButton } from "@/components/shiny-button";
import { MockDiscordUI } from "@/components/mock-discord-ui";
import { AnimatedList, AnimatedListItem } from "@/components/ui/animated-list";
import { DiscordMessage } from "@/components/discord-message";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Image from "next/image";
import { Icons } from "@/components/icons";

const Page = () => {

	const codeSnippet = `await fetch("http://localhost:3000/api/v1/events", {
		method: "POST",
		body: JSON.stringify({
		  category: "sale",
		  fields: {
			plan: "PRO",
			email: "zoe.martinez2001@email.com",
			amount: 49.00
		  }
		}),
		headers: {
		  Authorization: "Bearer <YOUR_API_KEY>"
		}
	})`

	return (
		<>
			<section className="relative py-24 sm:py-32 bg-brand-25">
				<MaxWidthWrapper className="text-center">
					<div className="relative mx-auto text-center flex flex-col items-center gap-10">
						<div>
							<Heading>
								<span>Real-time SaaS Insights,</span>
								<br />
								<span className="relative bg-gradient-to-r from-brand-700 to-brand-800 text-transparent bg-clip-text">
									Delivered to Your Discord
								</span>
							</Heading>
						</div>
						<p className="text-base/7 text-gray-600 max-w-prose text-center text-pretty">
							PingPanda is the easiest way to monitor your SaaS, Get instant notifications for
							{" "}
							<span className="font-semibold text-gray-700">
								Sales, new Users, or any other event
							</span>{" "}
							sent directly to your Discord.
						</p>
						<ul className="space-y-2 text-base/7 text-gray-600 text-left flex flex-col items-start">
							{[
								"Real-time discord alerts for critical events",
								"Buy once, use forever",
								"Track sales, new users, or any other events"
							].map((item, index) => (
								<li key={index} className="flex items-center gap-1.5 text-left">
									<Check className="size-5 shrink-0 text-brand-700" />
									{item}
								</li>
							))}
						</ul>
						<div className="w-full max-w-80">
							<ShinyButton href="/sign-up" className="relative z-10 h-14 w-full text-base shadow-lg hover:shadow-xl transition-shadow duration-300">Start For Free Today</ShinyButton>
						</div>
					</div>
				</MaxWidthWrapper>
			</section>
			<section className="relative bg-brand-25 pb-4">
				<div className="absolute inset-x-0 bottom-24 top-24 bg-brand-700" />
				<div className="relative mx-auto">
					<MaxWidthWrapper className="relative">
						<div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-inset-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
							<MockDiscordUI>
								<AnimatedList>
									<DiscordMessage
										avatarSrc="/brand-asset-profile-picture.png"
										avatarAlt="Brand Logo"
										username="pingpanda"
										timestamp="Today at 1:00pm"
										badgeColor="#43b581"
										badgeText="Signup"
										title="👤 New user signed up"
										content={{
											name: "devsire",
											email: "codeswithsire@pingpanda.com"
										}}
									/>
									<DiscordMessage
										avatarSrc="/brand-asset-profile-picture.png"
										avatarAlt="Brand Logo"
										username="pingpanda"
										timestamp="yesterday at 3:30pm"
										badgeColor="#faa61a"
										badgeText="Revenue"
										title="💰 Payment Recieved"
										content={{
											amount: "$49.00",
											email: "zoe.martinez2001@email.com",
											plan: "Commlinks PRO",
										}}
									/>
									<DiscordMessage
										avatarSrc="/brand-asset-profile-picture.png"
										avatarAlt="Brand Logo"
										username="PingPanda"
										timestamp="Today at 5:11AM"
										badgeText="Milestone"
										badgeColor="#5865f2"
										title="🚀 Revenue Milestone Achieved"
										content={{
											recurringRevenue: "$5.000 USD",
											growth: "+8.2%",
										}}
									/>
								</AnimatedList>
							</MockDiscordUI>
						</div>
					</MaxWidthWrapper>
				</div>
			</section>
			<section className="relative py-24 sm:py-32 bg-brand-25">
				<MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-20">
					<div>
						<h2 className="text-center text-base/7 font-semibold text-brand-600">
							Intuitive Monitoring
						</h2>
						<Heading className="text-center">Stay ahead of real-time insights</Heading>
					</div>
					<div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
						{/* First Bento grid element */}
						<div className="relative row-span-2">
							<div className="absolute inset-px rounded-lg bg-white lg:rounded-lg-[2rem]" />
							<div className="relative flex flex-col h-full overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
								<div className="pb-3 pt-8 px-8 sm:px-10 sm:pb-0 sm:pt-10">
									<p className="mt-2 font-medium text-lg/7 tracking-tight text-brand-950 max-lg:text-center">
										Real-time Notification
									</p>
									<p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
										Get notified about critical events the moment they happen, no matter if you&apos;re home or at the go
									</p>
								</div>
								<div className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
									<div className="absolute bottom-0 top-10 inset-x-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
										<Image src="/phone-screen.png" className="size-full object-cover object-top" alt="phone-screen-picture" fill />
									</div>
								</div>
							</div>
							<div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]" />
						</div>
						{/* Second Bento grid element */}
						<div className="relative max-lg:row-start-1">
							<div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]" />
							<div className="relative flex flex-col h-full overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
								<div className="px-8 pt-8 sm:px-10 sm:pt-10">
									<p className="mt-2 font-medium text-lg/7 tracking-tight text-brand-950 max-lg:text-center">
										Track Any Event
									</p>
									<p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
										From new user signups to successful payments, PingPanda notifies you for all critical events in your SaaS
									</p>
								</div>
								<div className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
									<Image className="w-full max-lg:max-w-xs" src="/bento-any-event.png" alt="event tracking" width={500} height={300} />
								</div>
							</div>
							<div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]" />
						</div>
						{/* Third Bento Grid Element */}
						<div className="relative row-start-3 lg:col-start-2 lg:row-start-2">
							<div className="absolute inset-px rounded-lg bg-white" />
							<div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
								<div className="px-8 pt-8 sm:px-10 sm:pt-10">
									<p className="mt-2 font-medium text-lg/7 tracking-tight text-brand-950 max-lg:text-center">
										Track Any Properties
									</p>
									<p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
										Any custom data you like to an event, such as a user email, a purchase amount, or an exceeded quota.
									</p>
								</div>
								<div className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
									<Image className="w-full max-lg:max-w-xs" src="/bento-custom-data.png" alt="Custom Data" width={500} height={300} />
								</div>
							</div>
							<div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5" />
						</div>
						{/* Fourth Bento Grid Element */}
						<div className="relative lg:row-span-2">
							<div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />
							<div className="relative flex flex-col h-full overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
								<div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
									<p className="mt-2 font-medium text-lg/7 tracking-tight text-brand-950 max-lg:text-center">
										Easy Integration
									</p>
									<p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
										Connect PingPanda with your existing workflows in minutes and call our intuitive logging API from any language.
									</p>
								</div>
								<div className="relative min-h-[30rem] w-full grow">
									<div className="absolute bottom-0 left-10 right-0 top-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">
										<div className="flex bg-gray-800/40 ring-1 ring-white/5">
											<div className="-mb-px flex font-medium text-sm/6 text-gray-400">
												<div className="border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white">
													pingpanda.js
												</div>
											</div>
										</div>
										<div className="overflow-hidden">
											<div className="max-h-[30rem]">
												<SyntaxHighlighter 
													language="typescript"
													style={{
														...oneDark,
														'pre[class*="language-"]': {
															...oneDark['pre[class*="language-"]'],
															background: "transparent",
															overflow: "hidden",
														},
														'code[class*="language-"]': {
															...oneDark['code[class*="language-"]'],
															background: "transparent",
														},
													}}
												>
													{codeSnippet}
												</SyntaxHighlighter>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem]" />
						</div>
					</div>
				</MaxWidthWrapper>
			</section>
			<section className="relative py-24 sm:py-32 bg-white">
				<MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-20">
					<div>
						<h2 className="text-center text-base/7 font-semibold text-brand-600">
							Real-world Experiences
						</h2>
						<Heading className="text-center">What our customers say</Heading>
					</div>
					<div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
						{/* First customer review */}
						<div className="flex flex-auto flex-col gap-4 bg-brand-25 p-6 sm:p-8 lg:p-16 rounded-t-[2rem] lg:rounded-tr-none lg:rounded-l-[2rem]">
							<div className="flex gap-0.5 mb-2 justify-center lg:justify-start">
								<Star className="size-5 text-brand-600 fill-brand-600" />
								<Star className="size-5 text-brand-600 fill-brand-600" />
								<Star className="size-5 text-brand-600 fill-brand-600" />
								<Star className="size-5 text-brand-600 fill-brand-600" />
								<Star className="size-5 text-brand-600 fill-brand-600" />
							</div>
							<p className="text-base sm:text-lg lg:text-lg/8 font-medium tracking-tight text-brand-950 text-center lg:text-left text-pretty">
								PingPanda has been a game-changer for me. I've been using it for two months and seeing sales pop-up in real-time is super satisfying.
							</p>
							<div className="flex flex-col justify-center lg:justify-start sm:flex-row items-center sm:items-start gap-4 mt-2">
								<Image src="/user-2.png" alt="user 2 image" className="rounded-full object-cover" width={48} height={48} />
								<div className="flex flex-col items-center sm:items-start">
									<p className="font-semibold flex items-center">
										Freya Larsson
										<Icons.verificationBadge className="size-4 inline-block ml-1.5" />
									</p>
									<p className="text-sm text-gray-600">@itsfreya</p>
								</div>
							</div>
						</div>
						{ /* Second customer review */ }
						<div className="flex flex-auto flex-col gap-4 bg-brand-25 p-6 sm:p-8 lg:p-16 rounded-b-[2rem] lg:rounded-bl-none lg:rounded-r-[2rem]">
							<div className="flex gap-0.5 mb-2 justify-center lg:justify-start">
								<Star className="size-5 text-brand-600 fill-brand-600" />
								<Star className="size-5 text-brand-600 fill-brand-600" />
								<Star className="size-5 text-brand-600 fill-brand-600" />
								<Star className="size-5 text-brand-600 fill-brand-600" />
							</div>
							<p className="text-base sm:text-lg lg:text-lg/8 font-medium tracking-tight text-brand-950 text-center lg:text-left text-pretty">
								PingPanda is paying off for our SaaS. Nice to have a simple to see what we're doing day-to-day. Definitely makes our lives easier.
							</p>
							<div className="flex flex-col justify-center lg:justify-start sm:flex-row items-center sm:items-start gap-4 mt-2">
								<Image src="/user-1.png" alt="user 2 image" className="rounded-full object-cover" width={48} height={48} />
								<div className="flex flex-col items-center sm:items-start">
									<p className="font-semibold flex items-center">
										Kai Durant
										<Icons.verificationBadge className="size-4 inline-block ml-1.5" />
									</p>
									<p className="text-sm text-gray-600">@ig_kai</p>
								</div>
							</div>
						</div>
					</div>
					<ShinyButton href="/sign-up" className="relative h-14 z-10 w-full max-w-xs text-base shadow-lg transition-shadow duration-300 hover:shadow-xl">
						Start For Free Today
					</ShinyButton>
				</MaxWidthWrapper>
			</section>
		</>
	)
}

export default Page;