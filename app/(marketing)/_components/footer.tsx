import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Footer = () => {
    return (
        <div className="fixed bottom-0 w-full p-4 border-b bg-slate-100"> 
           <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
                <Logo/>
                <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
                    <Button size="sm" variant="ghost">
                        <Link href="/privacy-policy">
                        Privacy Policy
                        </Link>
                    </Button>
                    <Button size="sm" variant="ghost">   
                        <Link href="/terms-of-service">
                        Terms of Service
                        </Link>
                    </Button>

                </div>
           </div>
        </div>
    );
};