"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Restaurant } from "@/data/restaurants";
import { toMapsAppUrl } from "@/lib/maps";

/** Élément DOM d'un marqueur en goutte coloré. */
function pinElement(color: string): HTMLElement {
  const el = document.createElement("div");
  el.style.cursor = "pointer";
  el.innerHTML = `<svg width="28" height="38" viewBox="0 0 26 34" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 0C6 0 0 5.6 0 12.5 0 21 13 34 13 34s13-13 13-21.5C26 5.6 20 0 13 0z"
      fill="${color}" stroke="#ffffff" stroke-width="1.5"/>
    <circle cx="13" cy="12.5" r="4.5" fill="#ffffff"/>
  </svg>`;
  return el;
}

export default function RestaurantsMapInner({
  restaurants,
  color,
}: {
  restaurants: Restaurant[];
  color: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Emprise couvrant tous les restos de la ville.
    const bounds = new maplibregl.LngLatBounds();
    restaurants.forEach((r) => bounds.extend([r.coords[1], r.coords[0]]));

    const map = new maplibregl.Map({
      container: containerRef.current,
      // Style vectoriel moderne et clair (gratuit, sans clé API).
      style: "https://tiles.openfreemap.org/styles/liberty",
      bounds,
      fitBoundsOptions: { padding: 44, maxZoom: 15 },
      attributionControl: false,
    });
    mapRef.current = map;

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    map.addControl(new maplibregl.FullscreenControl(), "top-right");
    map.addControl(
      new maplibregl.AttributionControl({ compact: true }),
      "bottom-right"
    );

    restaurants.forEach((r) => {
      const popup = new maplibregl.Popup({
        offset: 30,
        closeButton: true,
        maxWidth: "240px",
      }).setHTML(
        `<div style="font-family:system-ui,sans-serif;line-height:1.35">
          <div style="font-weight:700;font-size:14px">${r.emoji} ${r.name}</div>
          <div style="color:#1b6ca8;font-size:12px">${r.category} · ${"€".repeat(
          r.price
        )}${r.rating ? ` · ${r.rating.toFixed(1)}★` : ""}</div>
          <div style="font-size:12px;color:#555;margin:2px 0 4px">${r.address}</div>
          <a href="${toMapsAppUrl(
            r.mapsUrl
          )}" target="_blank" rel="noopener noreferrer" style="font-weight:700;color:#1b6ca8;font-size:12px;text-decoration:none">Ouvrir dans Maps →</a>
        </div>`
      );

      new maplibregl.Marker({ element: pinElement(color), anchor: "bottom" })
        .setLngLat([r.coords[1], r.coords[0]])
        .setPopup(popup)
        .addTo(map);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [restaurants, color]);

  return <div ref={containerRef} className="h-full w-full" />;
}
