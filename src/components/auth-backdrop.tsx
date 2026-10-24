// Shared by the sign-in and sign-up pages so they always match.

// Passed to Clerk's <SignIn /> / <SignUp />: brand colour for buttons, links and focus rings.
export const authAppearance = {
    variables: {
        colorPrimary: "#3659B1", // brand-700
        borderRadius: "0.625rem",
    },
}

export const AuthBackdrop = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative isolate flex w-full flex-1 items-center justify-center overflow-hidden bg-gradient-to-b from-brand-50 to-brand-100 px-4 py-16">
            {/* Blue strip, same idea as the band behind the mock UI on the landing page.
                Shorter than the card, so the card pokes out above and below it. */}
            <div aria-hidden className="absolute inset-x-0 top-1/2 -z-10 h-72 -translate-y-1/2 bg-brand-700" />
            {children}
        </div>
    )
}
