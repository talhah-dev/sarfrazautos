"use client";

import { useState } from "react";
import WholesaleHero from "./wholesale-hero";
import WholesaleCatalog from "./wholesale-catalog";

export function WholesaleShop() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <>
      <WholesaleHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <WholesaleCatalog
        searchQuery={searchQuery}
        activeCategory={activeCategory}
      />
    </>
  );
}

export default WholesaleShop;
