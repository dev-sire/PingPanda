import { SignUp } from "@clerk/nextjs";
import { AuthBackdrop, authAppearance } from "@/components/auth-backdrop";

const Page = () => {
    return(
        <AuthBackdrop>
            <SignUp
                appearance={authAppearance}
                fallbackRedirectUrl="/welcome"
                forceRedirectUrl="/welcome"
            />
        </AuthBackdrop>
    )
}

export default Page;