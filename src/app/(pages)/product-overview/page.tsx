import type { Metadata } from "next";
import Navbar from "@/components/home/navbar";
import RetailProductOverviewSection from "@/components/retail-product-overview/retail-product-overview-section";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Complete 70cc Cylinder Head Assembly | Sarfraz Autos",
  description:
    "Product overview and specifications for genuine 70cc motorcycle cylinder head assembly, valves, and engine replacement parts in Karachi.",
};

export default function ProductOverviewPage() {
  return (
    <>
      <Navbar className="bg-neutral-950" />
      <main className="min-h-screen bg-white">
        <RetailProductOverviewSection />
      </main>
      <Footer />
    </>
  );
}
