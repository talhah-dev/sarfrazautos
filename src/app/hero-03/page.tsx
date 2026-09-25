import Navbar from "@/components/home/navbar";
import HeroSection from "@/components/home/hero-section";

const Page = () => {
  return (
    <>
      <Navbar />
      <main className="-mt-20">
        <HeroSection />
      </main>
    </>
  );
};

export default Page;
