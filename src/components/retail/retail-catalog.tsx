"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Eye, Plus, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RetailProduct {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  category: string;
  bike: string;
  rating?: number;
  badge?: string;
  image: string;
}

const allProducts: RetailProduct[] = [
  {
    id: "rp-1",
    name: "Complete 70cc Cylinder Head Assembly",
    price: "Rs. 8,450",
    originalPrice: "Rs. 11,200",
    category: "Engine & Parts",
    bike: "Honda CD70",
    rating: 4.8,
    badge: "-25%",
    image: "/bike-engine.png",
  },
  {
    id: "rp-2",
    name: "High-Compression 4-Stroke Engine Block",
    price: "Rs. 16,800",
    originalPrice: "Rs. 19,800",
    category: "Engine & Parts",
    bike: "Honda CG125",
    rating: 4.9,
    badge: "-15%",
    image: "/bike-engine.png",
  },
  {
    id: "rp-3",
    name: "125cc Piston & Ring Kit (Standard 0.00)",
    price: "Rs. 4,200",
    originalPrice: "Rs. 4,700",
    category: "Engine & Parts",
    bike: "Honda CG125",
    rating: 4.7,
    badge: "-10%",
    image: "/bike-engine.png",
  },
  {
    id: "rp-4",
    name: "Crown Heavy Duty Clutch Plate Set (5 Pcs)",
    price: "Rs. 3,150",
    originalPrice: "Rs. 3,950",
    category: "Clutch & Gears",
    bike: "Honda CG125",
    rating: 4.6,
    badge: "-20%",
    image: "/bike-engine.png",
  },
  {
    id: "rp-5",
    name: "CD70 Performance Crankshaft Assembly",
    price: "Rs. 9,600",
    originalPrice: "Rs. 11,300",
    category: "Engine & Parts",
    bike: "Honda CD70",
    rating: 4.8,
    badge: "-15%",
    image: "/bike-engine.png",
  },
  {
    id: "rp-6",
    name: "Deluxe High-Flow Engine Oil Pump",
    price: "Rs. 2,450",
    originalPrice: "Rs. 2,900",
    category: "Others",
    bike: "Honda CD70",
    rating: 4.5,
    image: "/bike-engine.png",
  },
  {
    id: "rp-7",
    name: "Heavy Duty Camshaft & Rocker Arm Set",
    price: "Rs. 5,100",
    originalPrice: "Rs. 6,200",
    category: "Engine & Parts",
    bike: "Honda Pridor",
    rating: 4.7,
    badge: "-18%",
    image: "/bike-engine.png",
  },
  {
    id: "rp-8",
    name: "Complete Engine Overhaul Gasket Pack",
    price: "Rs. 1,850",
    originalPrice: "Rs. 2,650",
    category: "Others",
    bike: "Honda CD70",
    rating: 4.6,
    badge: "-30%",
    image: "/bike-engine.png",
  },
  {
    id: "rp-9",
    name: "Japanese Standard Carburetor Assembly",
    price: "Rs. 4,950",
    originalPrice: "Rs. 5,600",
    category: "Carburetor & Air",
    bike: "Honda CD70",
    rating: 4.9,
    badge: "-12%",
    image: "/bike-engine.png",
  },
  {
    id: "rp-10",
    name: "Complete Clutch Housing & Pressure Plate",
    price: "Rs. 6,800",
    originalPrice: "Rs. 8,000",
    category: "Clutch & Gears",
    bike: "Honda CG125",
    rating: 4.7,
    badge: "-15%",
    image: "/bike-engine.png",
  },
  {
    id: "rp-11",
    name: "Front & Rear Brake Shoe Set (Crown)",
    price: "Rs. 1,650",
    originalPrice: "Rs. 2,050",
    category: "Brakes",
    bike: "Honda CD70",
    rating: 4.8,
    badge: "-20%",
    image: "/bike-engine.png",
  },
  {
    id: "rp-12",
    name: "Electronic CDI Unit & Ignition Coil Kit",
    price: "Rs. 2,850",
    originalPrice: "Rs. 3,350",
    category: "Electrical",
    bike: "Suzuki GS150",
    rating: 4.5,
    badge: "-15%",
    image: "/bike-engine.png",
  },
  {
    id: "rp-13",
    name: "CG125 Performance Magneto Stator Plate",
    price: "Rs. 4,600",
    originalPrice: "Rs. 5,100",
    category: "Electrical",
    bike: "Honda CG125",
    rating: 4.7,
    badge: "-10%",
    image: "/bike-engine.png",
  },
  {
    id: "rp-14",
    name: "Primary & Secondary Gearbox Counter Shaft",
    price: "Rs. 7,400",
    originalPrice: "Rs. 8,600",
    category: "Clutch & Gears",
    bike: "Yamaha YBR125",
    rating: 4.8,
    badge: "-14%",
    image: "/bike-engine.png",
  },
  {
    id: "rp-15",
    name: "Front Hydraulic Disc Brake Caliper",
    price: "Rs. 5,900",
    originalPrice: "Rs. 7,200",
    category: "Brakes",
    bike: "Suzuki GS150",
    rating: 4.6,
    badge: "-18%",
    image: "/bike-engine.png",
  },
  {
    id: "rp-16",
    name: "Full Valve Set (Intake & Exhaust)",
    price: "Rs. 2,250",
    originalPrice: "Rs. 2,900",
    category: "Engine & Parts",
    bike: "Honda CD70",
    rating: 4.9,
    badge: "-22%",
    image: "/bike-engine.png",
  },
];

export function RetailCatalog({
  searchQuery = "",
  activeCategory = "All",
  activeBike = "All Brands",
  className = "",
}: {
  searchQuery?: string;
  activeCategory?: string;
  activeBike?: string;
  className?: string;
}) {
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const filteredProducts = allProducts.filter((p) => {
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.bike.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "All" || p.category === activeCategory;

    const matchesBike =
      !activeBike ||
      activeBike === "All Brands" ||
      activeBike === "All" ||
      p.bike.toLowerCase().includes(activeBike.toLowerCase()) ||
      (activeBike === "Others" &&
        !["Honda", "Suzuki", "Yamaha", "Crown", "Road Prince", "Super Power", "Unique", "United"].some((b) =>
          p.bike.toLowerCase().includes(b.toLowerCase())
        ));

    return matchesSearch && matchesCategory && matchesBike;
  });

  const handleAdd = (id: string) => {
    setAddedItems((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [id]: false }));
    }, 1800);
  };

  return (
    <section className={cn("w-full bg-white md:pt-6 md:pb-20 pb-16", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-neutral-50 rounded-3xl border border-neutral-200">
            <h3 className="text-base font-semibold text-neutral-900">
              No spare parts found
            </h3>
            <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
              We couldn&apos;t find matching products for &quot;{searchQuery}&quot;. Try searching for another part name or clear filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 md:gap-y-16 gap-y-10">
            {filteredProducts.map((product) => {
              const isAdded = !!addedItems[product.id];
              return (
                <div key={product.id} className="group flex flex-col">
                  <Link
                    href="/product-overview"
                    className="relative aspect-square w-full rounded-2xl bg-[#f4f4f5] overflow-hidden p-6 flex items-center justify-center transition-all duration-300 group-hover:bg-[#ebebee]"
                  >
                    {product.badge && (
                      <span className="absolute top-3.5 left-3.5 text-xs font-semibold px-2.5 py-0.5 rounded-full z-10 bg-red-100 text-red-600">
                        {product.badge}
                      </span>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain drop-shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:brightness-75"
                    />

                    <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-neutral-900 text-xs font-semibold shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <Eye className="size-3.5 text-neutral-700" />
                        <span>Preview</span>
                      </span>
                    </div>
                  </Link>

                  <div className="mt-3.5 flex flex-col gap-1 flex-1">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="text-neutral-500 font-medium truncate">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1 text-neutral-700 font-semibold shrink-0">
                        <Star className="size-3.5 fill-amber-400 text-amber-400" />
                        <span>{product.rating || 4.5}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 mt-0.5">
                      <Link href="/product-overview" className="min-w-0 flex-1 group/title">
                        <h3 className="font-medium text-neutral-900 group-hover/title:text-red-600 transition-colors text-sm md:text-base leading-snug line-clamp-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="font-semibold text-neutral-900 text-sm md:text-base">
                            {product.price}
                          </p>
                          {product.originalPrice && (
                            <span className="text-xs md:text-sm text-red-600 line-through font-normal">
                              {product.originalPrice}
                            </span>
                          )}
                        </div>
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleAdd(product.id)}
                        aria-label={`Add ${product.name} to order`}
                        className={cn(
                          "shrink-0 size-9 rounded-full flex items-center justify-center transition-all shadow-sm cursor-pointer mt-0.5",
                          isAdded
                            ? "bg-green-600 text-white scale-105"
                            : "bg-red-600 hover:bg-red-700 active:scale-95 text-white"
                        )}
                      >
                        {isAdded ? (
                          <Check className="size-4 stroke-[2.5]" />
                        ) : (
                          <Plus className="size-4 stroke-[2.5]" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default RetailCatalog;
