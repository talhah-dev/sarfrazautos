"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import WholesaleHero from "./wholesale-hero";
import WholesaleCatalog from "./wholesale-catalog";

function WholesaleShopContent() {
  const searchParams = useSearchParams();
  const brandParam = searchParams.get("brand");
  const categoryParam = searchParams.get("category");

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeBike, setActiveBike] = useState("All Brands");

  useEffect(() => {
    if (brandParam) {
      const lower = brandParam.toLowerCase();
      const mapped =
        lower === "honda"
          ? "Honda"
          : lower === "yamaha"
          ? "Yamaha"
          : lower === "suzuki"
          ? "Suzuki"
          : lower === "united"
          ? "United"
          : lower === "crown"
          ? "Crown"
          : lower === "super-star"
          ? "Super Star"
          : lower === "unique"
          ? "Unique"
          : brandParam;
      setActiveBike(mapped);
    }
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [brandParam, categoryParam]);

  return (
    <>
      <WholesaleHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        activeBike={activeBike}
        onBikeChange={setActiveBike}
      />
      <WholesaleCatalog
        searchQuery={searchQuery}
        activeCategory={activeCategory}
        activeBike={activeBike}
      />
    </>
  );
}

export function WholesaleShop() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <WholesaleShopContent />
    </Suspense>
  );
}

export default WholesaleShop;
