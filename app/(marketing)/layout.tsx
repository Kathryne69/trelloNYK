import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main className="pt-0 bg-slate-100">{children}</main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;