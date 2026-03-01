import { MenuItem, UserRole } from '@/lib/menu';
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


export const filterMenuByRole = (menu: MenuItem[], role: UserRole): MenuItem[] => {
  return menu
    .filter(item => Array.isArray(item.roles) && item.roles.includes(role))
    .map(item => ({
      ...item,
      children: item.children
        ? filterMenuByRole(item.children, role)
        : undefined,
    }))
}


export const capitalized = (str: string) => {
  if (!str) return '';
  return str.split(' ')
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
}


export const capitalizeAndSpace = (text: string) => {
  if (!text) return '';
  return text
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};