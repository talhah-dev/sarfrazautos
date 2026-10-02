"use client";

import { useState } from "react";
import RetailHero from "./retail-hero";
import RetailCatalog from "./retail-catalog";

export function RetailShop() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeBike, setActiveBike] = useState("All Brands");

  return (
    <>
      <RetailHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        activeBike={activeBike}
        onBikeChange={setActiveBike}
      />
      <RetailCatalog
        searchQuery={searchQuery}
        activeCategory={activeCategory}
        activeBike={activeBike}
      />
    </>
  );
}

export default RetailShop;
