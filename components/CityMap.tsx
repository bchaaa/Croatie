"use client";

import dynamic from "next/dynamic";
import type { Restaurant } from "@/data/restaurants";

// Leaflet touche à `window` → chargé uniquement côté client (pas de SSR).
const Inner = dynamic(() => import("./RestaurantsMapInner"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-elevated" />,
});

export default function CityMap(props: {
  restaurants: Restaurant[];
  color: string;
}) {
  return <Inner {...props} />;
}
