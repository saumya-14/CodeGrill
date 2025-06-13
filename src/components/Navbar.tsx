import Link from "next/link";

import { CodeIcon } from "lucide-react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import DasboardBtn from "./DasboardBtn";
import { ModeToggle } from "./ModeToggle";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* LEFT SIDE - LOGO */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-2xl mr-6 font-mono hover:opacity-80 transition-all duration-200 hover:scale-[1.02]"
        >
          <CodeIcon className="size-8 text-primary" />
          <span className="gradient-text">
            CodeGrill
          </span>
        </Link>

        {/* RIGHT SIDE - ACTIONS */}
        <SignedIn>
          <div className="flex items-center space-x-4 ml-auto">
            <DasboardBtn />
            <div className="flex items-center gap-2">
              <ModeToggle />
              <div className="button-hover">
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "size-8"
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}

export default Navbar;