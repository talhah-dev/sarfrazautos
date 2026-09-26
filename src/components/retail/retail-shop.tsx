"use client";

import { useState } from "react";
import RetailHero from "./retail-hero";
import RetailCatalog from "./retail-catalog";

export function RetailShop() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <>
      <RetailHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <RetailCatalog
        searchQuery={searchQuery}
        activeCategory={activeCategory}
      />
    </>
  );
}

export default RetailShop;
