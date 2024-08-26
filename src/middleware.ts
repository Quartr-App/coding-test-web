import { NextRequest, NextResponse } from "next/server"

const staticFileExtensions = /\.(svg|png|jpg|jpeg|webmanifest|ico|css|js|txt|xml)$/

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const url = request.nextUrl.clone()
  const { pathname } = url

  if (staticFileExtensions.test(pathname)) {
    return NextResponse.next()
  }

  if (pathname === "/" || pathname === "") {
    url.pathname = "/companies"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next).*)"]
}
