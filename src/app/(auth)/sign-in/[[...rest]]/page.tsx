import { SignIn } from "@clerk/nextjs";

const Page = () => {
    return(
        <div className="w-full flex flex-1 items-center justify-center">
            <SignIn />
        </div>
    )
}

export default Page;