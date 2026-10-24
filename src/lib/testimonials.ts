export type Testimonial = {
    name: string
    role: string
    /** Short tag shown on the card, e.g. what they use PingPanda for */
    useCase: string
    quote: string
    /** 1-5, defaults to 5 */
    rating?: number
    /** Optional photo in /public. Falls back to initials. */
    avatar?: string
    /**
     * PLACEHOLDER: not a real customer yet. While any entry has this flag, the
     * slider shows a small "sample testimonials" note under it. Replace these
     * entries with real ones (and drop the flag) as reviews come in.
     */
    placeholder?: boolean
}

export const testimonials: Testimonial[] = [
    {
        name: "Freya Larsson",
        role: "Indie maker",
        useCase: "Sales alerts",
        avatar: "/user-2.png",
        quote:
            "PingPanda has been a game-changer for me. I’ve been using it for two months and seeing sales pop up in real time is super satisfying.",
        placeholder: true,
    },
    {
        name: "Kai Durant",
        role: "SaaS founder",
        useCase: "Daily ops",
        avatar: "/user-1.png",
        quote:
            "PingPanda is paying off for our SaaS. It’s nice to have a simple way to see what we’re doing day to day. It definitely makes our lives easier.",
        placeholder: true,
    },
    {
        name: "Mateo Alvarez",
        role: "Solo developer",
        useCase: "Signups",
        quote:
            "I wired a signup event into my backend in about ten minutes. Now every new user shows up in Discord before I’ve finished my coffee.",
        placeholder: true,
    },
    {
        name: "Priya Raman",
        role: "Product engineer",
        useCase: "Payments",
        quote:
            "We use it for failed-payment alerts. Having the customer’s email right in the message means I can reach out while it still matters.",
        placeholder: true,
    },
    {
        name: "Jonas Weber",
        role: "Bootstrapped founder",
        useCase: "Custom data",
        quote:
            "I added a custom property for plan tier, and now I can tell at a glance whether a ping is a free trial or a paying customer.",
        placeholder: true,
    },
    {
        name: "Amara Okafor",
        role: "Backend developer",
        useCase: "Error alerts",
        quote:
            "The API is refreshingly small. One POST request and a bearer token, and my error alerts were landing in my Discord DMs.",
        placeholder: true,
    },
]
