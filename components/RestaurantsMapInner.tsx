"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { Restaurant } from "@/data/restaurants";
import { toMapsAppUrl } from "@/lib/maps";

/** Marqueur en goutte, coloré selon la ville (aucune image externe requise). */
function pinIcon(color: string) {
  return L.divIcon({
    className: "resto-pin",
    html: `<svg width="26" height="34" viewBox="0 0 26 34" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 0C6 0 0 5.6 0 12.5 0 21 13 34 13 34s13-13 13-21.5C26 5.6 20 0 13 0z"
        fill="${color}" stroke="#0b1622" stroke-width="1.5"/>
      <circle cx="13" cy="12.5" r="4.5" fill="#0b1622"/>
    </svg>`,
    iconSize: [26, 34],
    iconAnchor: [13, 34],
    popupAnchor: [0, -32],
  });
}

export default function RestaurantsMapInner({
  restaurants,
  color,
}: {
  restaurants: Restaurant[];
  color: string;
}) {
  const bounds = L.latLngBounds(restaurants.map((r) => r.coords));
  const icon = pinIcon(color);

  return (
    <MapContainer
      bounds={bounds}
      boundsOptions={{ padding: [28, 28] }}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      {/* Tuiles sombres (CARTO) pour coller au thème de l'app. */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; OpenStreetMap &copy; CARTO'
      />
      {restaurants.map((r) => (
        <Marker key={r.id} position={r.coords} icon={icon}>
          <Popup>
            <span style={{ fontWeight: 700, fontSize: "14px" }}>
              {r.emoji} {r.name}
            </span>
            <br />
            <span style={{ color: "#1b6ca8" }}>{r.category}</span> ·{" "}
            {"€".repeat(r.price)}
            <br />
            {r.priceNote}
            {r.rating ? ` · ${r.rating.toFixed(1)}★` : ""}
            <br />
            <span style={{ color: "#555" }}>{r.address}</span>
            <br />
            <a
              href={toMapsAppUrl(r.mapsUrl)}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontWeight: 700, color: "#1b6ca8" }}
            >
              Ouvrir dans Maps →
            </a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
