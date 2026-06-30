import type { Accommodation } from "./types";

export const accommodations: Accommodation[] = [
  {
    id: "split-debut",
    name: "Split Summer Budget Rooms",
    address: "Split, Croatie",
    checkin: "2026-07-01",
    checkout: "2026-07-03",
    mapsUrl: "https://maps.google.com/?q=Split+Summer+Budget+Rooms+Split",
    nights: 2,
  },
  {
    id: "makarska",
    name: "Apartments Ivan",
    address: "Vukovarska ulica 26, 21300 Makarska, Croatie",
    checkin: "2026-07-03",
    checkout: "2026-07-05",
    mapsUrl: "https://maps.google.com/?q=Vukovarska+ulica+26+Makarska",
    nights: 2,
  },
  {
    id: "dubrovnik",
    name: "Villa Franovic",
    address: "Antuna Kazali 15, Lapad, 20000 Dubrovnik, Croatie",
    checkin: "2026-07-05",
    checkout: "2026-07-07",
    mapsUrl: "https://maps.google.com/?q=Antuna+Kazali+15+Dubrovnik",
    nights: 2,
  },
  {
    id: "split-fin",
    name: "Split Summer Budget Rooms",
    address: "Split, Croatie",
    checkin: "2026-07-07",
    checkout: "2026-07-08",
    mapsUrl: "https://maps.google.com/?q=Split+Summer+Budget+Rooms+Split",
    nights: 1,
  },
];

export function getAccommodation(id?: string): Accommodation | undefined {
  if (!id) return undefined;
  return accommodations.find((a) => a.id === id);
}
