import { getCookie } from 'cookies-next';

export const getAuthToken = async () => {
    if (typeof window !== "undefined") {
      // Client-side: Use searchParams (if available) or cookies
      return (getCookie("token") || null );
    }
  
    // Server-side: Use searchParams (if available) or Next.js headers and cookies
    const { cookies, headers } = await import("next/headers");
    return ( (await headers()).get("token") || (await cookies()).get("token")?.value || null );
};


export const FormattedDate = (dateStr: string) => {
  const date = new Date(dateStr);

  // customize locale & options as you like
  const formatted = date.toLocaleDateString('en-US', {
      year:  'numeric',
      month: 'long',
      day:   'numeric',
  });

  return formatted;    
}

export const formatCurrency = (amount: number) => {

  const formatted  = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
  }).format(amount || 0);


  return formatted;
}