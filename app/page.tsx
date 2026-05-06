import Footer from "@/src/components/public/Footer";
import Hero from "@/src/components/public/Hero";
import Nav from "@/src/components/public/Nav";

export default function Home() {
  return (
    <div className="bg-[#0B1F3A] min-h-screen ">
      <Nav />
      <Hero />
      <Footer/>
    </div>
  );
}
