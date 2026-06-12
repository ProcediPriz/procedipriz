import { clerkMiddleware } from "@clerk/nextjs/server";

// Non-blocking passthrough middleware.
// Clerk hydrates the session on all routes but never redirects.
// Route protection is handled at the component level (sign-in gate)
// and at the Go backend (JWT validation on composition endpoints).
export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and static assets.
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API proxy routes.
    "/(api|trpc)(.*)",
  ],
};
