// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from "../src/lib/sessions"
import { cookies } from 'next/headers'

const isProtected = [
        '/post',
        '/profile',
]
const publicRoutes = ['/sign-in', '/sign-up']
const RoleProtected = ['/administrator(.*)'];
const Middleware = async (req: NextRequest) => {
        
        const path = req.nextUrl.pathname
        const isProtectedPath = isProtected.includes(path)
        const isPublicRoute = publicRoutes.includes(path)
        const isRoleProtected = RoleProtected.some((pattern) => new RegExp(pattern).test(path));

        const cookie = (await cookies()).get("session")?.value
        // console.log("session",cookie)
        const session = await decrypt(cookie)
        

        if(isProtectedPath && !session){
                return NextResponse.redirect(new URL('/sign-in', req.url))
        }
        if(isRoleProtected && session?.role!="superuser"){
                return NextResponse.json({unauthorized:"You are Unauthorized to Access this page"})
        }

        if (isPublicRoute && session?.userId && req.nextUrl.pathname != '/') {
                return NextResponse.redirect(new URL('/', req.nextUrl))
  }
 
  return NextResponse.next()
}

export default Middleware;

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};