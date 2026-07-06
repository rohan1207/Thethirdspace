import Navbar from "../Navbar";
import Footer from "../Footer";

export default function PageLayout({ children }) {
  return (
    <>
      <Navbar solid />
      <main className="min-h-screen bg-white font-sans">{children}</main>
      <Footer />
    </>
  );
}
