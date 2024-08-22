import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import SimpleUploadButton from "./simple-upload-button";

export default function TopNav() {
    return (
        <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
            <div>Gallery</div>
            <div>
                <SignedOut>
                    <SignInButton>Sign In</SignInButton>
                </SignedOut>
                <SignedIn>
                    <div className="flex items-center gap-4">
                        <SimpleUploadButton />
                        <UserButton />
                    </div>
                </SignedIn>
            </div>
        </nav>
    );
}
