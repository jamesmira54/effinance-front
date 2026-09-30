import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import StyledComponentsRegistry from "@/lib/registry";
import { LoaderProvider } from "@/context/LoaderContext";
import LoaderAutoHide from "@/context/LoaderAutoHide";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <LoaderProvider>
            <LoaderAutoHide />
            <main className="dark:bg-boxdark-2 dark:text-bodydark" style={{height: '100vh', overflow: 'auto'}}>
              {children}
            </main>
          </LoaderProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
