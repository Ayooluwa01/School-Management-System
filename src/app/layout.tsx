import { Outfit } from 'next/font/google';
import './globals.css';
import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import AuthProvider from '@/components/Providers/AuthProviders';
import QueryProvider from '@/components/Providers/QueryProvider';
const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
          <body className={`${outfit.className} dark:bg-gray-900`}>
    
        <ThemeProvider>
          <QueryProvider>
            
         
    <AuthProvider>
            <SidebarProvider>{children}</SidebarProvider>
    </AuthProvider>
     </QueryProvider>
            </ThemeProvider>

      </body>
    </html>
  );
}