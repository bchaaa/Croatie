// Sélection de restaurants par ville-étape, regroupés autour de nos logements.
// Locaux, plutôt abordables et bien notés, avec plusieurs catégories pour
// varier. Les suggestions du programme (pages jour) restent contextuelles
// « selon où on est » ; cette liste-ci sert de carnet d'adresses par base.

export interface Restaurant {
  id: string;
  name: string;
  /** Catégorie courte (konoba poisson, street food, pizza, veggie…). */
  category: string;
  /** Emoji du badge de catégorie. */
  emoji: string;
  /** Niveau de prix : 1 = € (pas cher) · 2 = €€ · 3 = €€€. */
  price: 1 | 2 | 3;
  /** Fourchette par personne, indicative. */
  priceNote: string;
  /** Note moyenne /5 (avis), si connue. */
  rating?: number;
  /** Quartier / repère (proximité logement, vieille ville…). */
  area: string;
  address: string;
  mapsUrl: string;
  /** Position [latitude, longitude] pour le marqueur de la carte (indicative). */
  coords: [number, number];
  description: string;
}

export interface RestaurantBase {
  city: string;
  /** Notre logement dans cette ville (repère de proximité). */
  accommodation: string;
  /** Spécialité(s) locale(s) à goûter dans le coin. */
  specialty: string;
  restaurants: Restaurant[];
}

export const restaurantsByBase: RestaurantBase[] = [
  {
    city: "Split",
    accommodation: "Split Summer Budget Rooms",
    specialty:
      "À goûter : poisson grillé, crni rižot (risotto à l'encre de seiche), pašticada (bœuf mijoté) et les ćevapi pour manger sur le pouce.",
    restaurants: [
      {
        id: "r-split-marjan",
        name: "Konoba Marjan",
        category: "Konoba traditionnelle",
        emoji: "🐟",
        price: 2,
        priceNote: "~15-20 €/pers",
        area: "1 rue derrière le Palais",
        address: "Senjska ul. 1, 21000 Split",
        mapsUrl: "https://maps.google.com/?q=Konoba+Marjan+Split",
        coords: [43.5090, 16.4370],
        description:
          "Konoba sans chichis pour un dîner dalmate sans se ruiner, à l'écart des pièges à touristes du Palais.",
      },
      {
        id: "r-split-spiza",
        name: "Villa Spiza",
        category: "Cantine locale",
        emoji: "🍲",
        price: 2,
        priceNote: "~12-18 €/pers",
        rating: 4.6,
        area: "Vieille ville",
        address: "Ul. Petra Kružića 3, 21000 Split",
        mapsUrl: "https://maps.google.com/?q=Villa+Spiza+Split",
        coords: [43.5089, 16.4405],
        description:
          "Minuscule comptoir, plats du jour écrits au tableau selon le marché. Très prisé, ça tourne vite — un peu de patience à l'entrée.",
      },
      {
        id: "r-split-fetivi",
        name: "Konoba Fetivi",
        category: "Poisson · guide Michelin",
        emoji: "🦑",
        price: 2,
        priceNote: "~18-25 €/pers",
        rating: 4.5,
        area: "Port de Matejuška",
        address: "Tomića Stine 3, 21000 Split",
        mapsUrl: "https://maps.google.com/?q=Konoba+Fetivi+Split",
        coords: [43.5083, 16.4370],
        description:
          "Konoba familiale, poisson frais généreux. Cité au guide Michelin mais reste abordable — réserver le soir.",
      },
      {
        id: "r-split-paulina",
        name: "Kantun Paulina",
        category: "Ćevapi · street food",
        emoji: "🥙",
        price: 1,
        priceNote: "~5-8 €/pers",
        rating: 4.6,
        area: "Quartier Varoš",
        address: "Matošića ul. 1, 21000 Split",
        mapsUrl: "https://maps.google.com/?q=Kantun+Paulina+Split",
        coords: [43.5096, 16.4378],
        description:
          "Les meilleurs ćevapi de Split depuis 35+ ans, à emporter. File d'attente = bon signe. Espèces uniquement.",
      },
      {
        id: "r-split-bokamorra",
        name: "Bokamorra",
        category: "Pizza napolitaine",
        emoji: "🍕",
        price: 2,
        priceNote: "~10-16 €/pizza",
        area: "Bord de mer (Trumbićeva obala)",
        address: "Trumbićeva obala 16, 21000 Split",
        mapsUrl: "https://maps.google.com/?q=Bokamorra+Split",
        coords: [43.5069, 16.4381],
        description:
          "Réputée pour la meilleure pizza (pâte napolitaine) de la ville, ambiance décontractée face à la mer.",
      },
      {
        id: "r-split-fife",
        name: "Konoba Fife",
        category: "Cantine bord de mer",
        emoji: "⚓",
        price: 1,
        priceNote: "~10-15 €/pers",
        area: "Matejuška",
        address: "Trumbićeva obala 11, 21000 Split",
        mapsUrl: "https://maps.google.com/?q=Konoba+Fife+Split",
        coords: [43.5071, 16.4386],
        description:
          "Institution populaire au bord de l'eau, poisson frais et plats copieux à prix doux. Cadre simple, portions généreuses.",
      },
    ],
  },
  {
    city: "Makarska",
    accommodation: "Apartments Ivan",
    specialty:
      "À goûter : poisson grillé du jour, brudet (ragoût de poisson) et le vin local Plavac mali.",
    restaurants: [
      {
        id: "r-mak-kalalarga",
        name: "Konoba Kalalarga",
        category: "Konoba · poisson du jour",
        emoji: "🐟",
        price: 2,
        priceNote: "~12-18 €/pers",
        rating: 4.2,
        area: "Vieille ville",
        address: "Kalalarga 40, 21300 Makarska",
        mapsUrl: "https://maps.google.com/?q=Konoba+Kalalarga+Makarska",
        coords: [43.2963, 17.0182],
        description:
          "Sans carte : poisson pêché du jour et vin maison à petit prix. Petite salle, réserver par téléphone en été.",
      },
      {
        id: "r-mak-susvid",
        name: "Restoran Susvid",
        category: "Croate authentique",
        emoji: "🍖",
        price: 2,
        priceNote: "~18-28 €/pers",
        rating: 4.2,
        area: "En retrait de la promenade",
        address: "Kačićev trg 8, 21300 Makarska",
        mapsUrl: "https://maps.google.com/?q=Restoran+Susvid+Makarska",
        coords: [43.2958, 17.0189],
        description:
          "Cuisine croate soignée, poisson frais et spécialités locales. Un cran au-dessus, très apprécié des locaux.",
      },
      {
        id: "r-mak-tempera",
        name: "Tempera Streetfood & Bar",
        category: "Street food · moderne",
        emoji: "🥙",
        price: 1,
        priceNote: "~8-12 €/pers",
        area: "Centre / front de mer",
        address: "Centre de Makarska (terrasse bord de mer)",
        mapsUrl: "https://maps.google.com/?q=Tempera+Streetfood+Makarska",
        coords: [43.2966, 17.0168],
        description:
          "Street food moderne et décontractée, grande terrasse côté mer. Idéal pour un repas rapide et pas cher.",
      },
    ],
  },
  {
    city: "Dubrovnik",
    accommodation: "Villa Franovic (Lapad)",
    specialty:
      "À goûter : šporki makaruli (macaronis à la sauce de bœuf), huîtres de Ston, crni rižot et la rožata (dessert à la crème).",
    restaurants: [
      {
        id: "r-dbv-pantarul",
        name: "Pantarul",
        category: "Bistro moderne",
        emoji: "🍽️",
        price: 2,
        priceNote: "~15-25 €/pers",
        rating: 4.5,
        area: "Lapad · proche du logement",
        address: "Ul. kralja Tomislava 1, 20000 Dubrovnik (Lapad)",
        mapsUrl: "https://maps.google.com/?q=Pantarul+Dubrovnik",
        coords: [42.6549, 18.0806],
        description:
          "Cuisine créative croate/méditerranéenne, produits locaux, belles options végé. Le meilleur choix à deux pas du logement.",
      },
      {
        id: "r-dbv-dubrava",
        name: "Konoba Dubrava",
        category: "Konoba · peka & vue",
        emoji: "🍖",
        price: 2,
        priceNote: "~18-28 €/pers",
        area: "Colline de Srđ (au-dessus de la ville)",
        address: "Bosanka, Srđ, 20000 Dubrovnik",
        mapsUrl: "https://maps.google.com/?q=Konoba+Dubrava+Dubrovnik",
        coords: [42.6486, 18.1246],
        description:
          "Konoba rustique loin de la foule, spécialités sous la cloche (peka), grillades et vue imprenable. Prévoir un taxi/voiture.",
      },
      {
        id: "r-dbv-barba",
        name: "Barba",
        category: "Street food · fruits de mer",
        emoji: "🐙",
        price: 1,
        priceNote: "~8-12 €/pers",
        rating: 4.4,
        area: "Vieille ville",
        address: "Boškovićeva ul. 5, 20000 Dubrovnik",
        mapsUrl: "https://maps.google.com/?q=Barba+Dubrovnik",
        coords: [42.6413, 18.1093],
        description:
          "Street food de la mer (burger de poulpe, sandwich au thon) : la qualité d'un resto de poisson à une fraction du prix.",
      },
      {
        id: "r-dbv-taj",
        name: "Taj Mahal",
        category: "Bosniaque · ćevapi",
        emoji: "🥙",
        price: 2,
        priceNote: "~12-20 €/pers",
        rating: 4.4,
        area: "Vieille ville",
        address: "Ul. Nikole Gučetića 2, 20000 Dubrovnik",
        mapsUrl: "https://maps.google.com/?q=Taj+Mahal+Dubrovnik+Old+Town",
        coords: [42.6404, 18.1082],
        description:
          "Malgré le nom, cuisine bosniaque : les meilleurs ćevapi de Dubrovnik, burek et plats copieux. Réserver, c'est petit.",
      },
      {
        id: "r-dbv-nishta",
        name: "Nishta",
        category: "Végétarien · vegan",
        emoji: "🥗",
        price: 2,
        priceNote: "~15-25 €/pers",
        rating: 4.5,
        area: "Vieille ville (rue Prijeko)",
        address: "Prijeko ul., 20000 Dubrovnik",
        mapsUrl: "https://maps.google.com/?q=Nishta+Dubrovnik",
        coords: [42.6416, 18.1086],
        description:
          "Cuisine végé/vegan fusion (falafel, curry, soupes). Petite terrasse, réserver de juin à septembre.",
      },
      {
        id: "r-dbv-tabasco",
        name: "Pizzeria Tabasco",
        category: "Pizza",
        emoji: "🍕",
        price: 1,
        priceNote: "~8-12 €/pers",
        rating: 4.3,
        area: "Près de la Porte Ploče",
        address: "Hvarska ul. 48A, 20000 Dubrovnik",
        mapsUrl: "https://maps.google.com/?q=Pizzeria+Tabasco+Dubrovnik",
        coords: [42.6423, 18.1126],
        description:
          "La pizzeria préférée des locaux depuis des années, bien moins chère que dans les murs de la vieille ville.",
      },
    ],
  },
];
