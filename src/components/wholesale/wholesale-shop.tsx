"use client";

import { useState } from "react";
import WholesaleHero from "./wholesale-hero";
import WholesaleCatalog from "./wholesale-catalog";

export function WholesaleShop() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeBike, setActiveBike] = useState("All Brands");

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

export default WholesaleShop;
