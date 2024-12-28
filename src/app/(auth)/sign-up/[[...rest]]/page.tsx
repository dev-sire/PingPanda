import { SignUp } from "@clerk/nextjs";

const Page = () => {
    return(
        <div className="w-full flex flex-1 items-center justify-center">
            <SignUp fallbackRedirectUrl="/welcome" forceRedirectUrl="/welcome" />
        </div>
    )
}

export default Page;