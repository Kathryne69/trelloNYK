import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
    publicRoutes: ["/"],
    afterAuth(auth, req) {
        if (auth.userId && auth.isPublicRoute) {
            let path = "/select-org";

            if (auth.orgId) {
                path = `/organization/${auth.orgId}`; // Corrected string interpolation syntax

                const orgSelection = new URL(path, req.url);
                return NextResponse.redirect(orgSelection);
            }

            if (!auth.userId && !auth.isPublicRoute) {
                // Redirect to sign-in page with a returnBackUrl query parameter
                return redirectToSignIn({ returnBackUrl: req.url });
            }

            if (auth.userId && !auth.orgId && req.nextUrl.pathname !== "/select-org") {
                // If the user is authenticated but not associated with any organization
                // and they are not already on the organization selection page,
                // redirect them to the organization selection page
                const orgSelection = new URL("/select-org", req.url);
                return NextResponse.redirect(orgSelection);
            }
        }
    }
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
