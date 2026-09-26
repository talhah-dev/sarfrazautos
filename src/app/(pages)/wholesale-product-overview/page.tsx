import type { Metadata } from "next";
import Navbar from "@/components/home/navbar";
import WholesaleProductOverviewSection from "@/components/wholesale-product-overview/wholesale-product-overview-section";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "CD70 Complete Cylinder Head (Master Carton of 12) | Sarfraz Autos Wholesale",
  description:
    "Source wholesale master cartons of 70cc motorcycle cylinder heads at direct dealer rates. MOQ 2 cartons with nationwide freight dispatch from Karachi.",
};

export default function WholesaleProductOverviewPage() {
  return (
    <>
      <Navbar className="bg-neutral-950" />
      <main className="min-h-screen bg-white">
        <WholesaleProductOverviewSection />
      </main>
      <Footer />
    </>
  );
}
