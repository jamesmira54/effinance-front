import PublicFooter from "./PublicFooter";
import PublicHeader from "./PublicHeader";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-whiten text-body dark:bg-boxdark-2 dark:text-bodydark">
      <PublicHeader />
      <main>{children}</main>
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;
