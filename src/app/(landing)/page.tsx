import { Heading } from "@/components/heading";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Check } from "lucide-react";
import { ShinyButton } from "@/components/shiny-button";
import { MockDiscordUI } from "@/components/mock-discord-ui";
import { AnimatedList, AnimatedListItem } from "@/components/ui/animated-list";
import { DiscordMessage } from "@/components/discord-message";
import Image from "next/image";

const Page = () => {
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
						<Heading>Stay ahead of real-time insights</Heading>
					</div>
					<div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
						{/* First Bento grid element */}
						<div className="relative row-span-2">
							<div className="absolute inset-px rounded-lg bg-white lg:rounded-lg-[2rem]" />
							<div className="relative flex flex-col h-full overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
								<div className="pb-3 pt-8 px-8 sm:px-10 sm:pb-0 sm:pt-10">
									<p className="mt-2 font-medium text-lg/7 tracking-tight text-brand-950 max-lg:text-center">
										Real-time notification
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
					</div>
				</MaxWidthWrapper>
			</section>
			<section></section>
		</>
	)
}

export default Page;