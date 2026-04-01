import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import StyledComponentsRegistry from "@/lib/registry";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <main className="dark:bg-boxdark-2 dark:text-bodydark" style={{height: '100vh', overflow: 'auto'}}>
            {children}
          </main>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
