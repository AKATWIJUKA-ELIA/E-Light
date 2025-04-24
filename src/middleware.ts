import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtected = createRouteMatcher([
        '/post(.*)'
])
const isRoleProtected = createRouteMatcher([
        '/administrator(.*)'
])
export default clerkMiddleware(async(auth, req)=>{
        if(isProtected(req)){
                await auth.protect()
        }
        if (isRoleProtected(req)) {
                const { userId, sessionClaims } = await auth();
            
                if (!userId) {
                  await auth.protect();
                }

                // Define the type for publicMetadata
                type PublicMetadata = {
                  role?: string;
                };

                const publicMetadata = sessionClaims?.publicMetadata as PublicMetadata;
                const userRole = publicMetadata?.role;
            
                if (userRole !== "admin") {
                  // Redirect or throw custom error
                  return new Response("Unauthorized", { status: 403 });
                }
              }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};