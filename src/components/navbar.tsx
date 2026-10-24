import { currentUser } from "@clerk/nextjs/server";
import { NavbarMenu } from "./navbar-menu";

export const Navbar = async () => {
    const user = await currentUser();

    return (
        <NavbarMenu
            user={
                user
                    ? {
                          imageUrl: user.imageUrl,
                          name: user.fullName ?? user.username ?? "Your account",
                      }
                    : null
            }
        />
    )
}
