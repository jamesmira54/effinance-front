import { getCookie } from 'cookies-next';

export const getAuthToken = async () => {
    if (typeof window !== "undefined") {
      // Client-side: Use searchParams (if available) or cookies
      return (getCookie("access-token") || null );
    }
  
    // Server-side: Use searchParams (if available) or Next.js headers and cookies
    const { cookies, headers } = await import("next/headers");
    return ( (await headers()).get("token") || (await cookies()).get("token")?.value || null );
};