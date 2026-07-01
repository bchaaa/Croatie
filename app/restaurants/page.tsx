import { UtensilsCrossed, Star, MapPin, BedDouble, Sparkles } from "lucide-react";
import { restaurantsByBase, type Restaurant } from "@/data/restaurants";
import { cityGradient, cityHex } from "@/lib/cities";
import { toMapsAppUrl, toMapsEmbedUrl } from "@/lib/maps";
import CityMap from "@/components/CityMap";
import RestaurantMapButton from "@/components/RestaurantMapButton";

export const metadata = {
  title: "Restaurants — Croatie 2026",
};

export default function RestaurantsPage() {
  return (
    <div className="space-y-6">
      <header className="px-1">
        <h1 className="flex items-center gap-2 font-display text-2xl font-bold text-ink">
          <UtensilsCrossed className="h-6 w-6 text-turquoise" aria-hidden />
          Où manger
        </h1>
        <p className="text-sm text-muted">
          Nos adresses locales par ville, regroupées autour des logements. Bien
          notées et plutôt abordables — à piocher selon l'envie.
        </p>
      </header>

      {restaurantsByBase.map((base) => (
        <section key={base.city}>
          {/* En-tête de ville */}
          <div className="mb-3 px-1">
            <div className="flex items-center gap-3">
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${cityGradient(
                  base.city
                )} text-white shadow-soft`}
              >
                <UtensilsCrossed className="h-5 w-5" aria-hidden />
              </span>
              <div className="min-w-0">
                <h2 className="font-display text-xl font-bold text-ink">
                  {base.city}
                </h2>
                <p className="flex items-center gap-1 text-xs text-muted">
                  <BedDouble className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  {base.accommodation}
                </p>
              </div>
            </div>

            {/* Spécialité locale */}
            <p className="mt-2 flex items-start gap-1.5 rounded-xl bg-sand/10 p-2.5 text-xs leading-relaxed text-sand">
              <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
              <span>{base.specialty}</span>
            </p>
          </div>

          {/* Carte cliquable : un marqueur par resto, infos au clic */}
          <div className="relative z-0 mb-2.5 h-56 overflow-hidden rounded-2xl border border-line shadow-soft">
            <CityMap restaurants={base.restaurants} color={cityHex(base.city)} />
          </div>

          <ul className="space-y-2.5">
            {base.restaurants.map((r) => (
              <li key={r.id}>
                <RestaurantCard r={r} />
              </li>
            ))}
          </ul>
        </section>
      ))}

      <p className="pb-2 text-center text-xs text-muted/70">
        Astuce : à Dubrovnik, s'éloigner de quelques rues de la vieille ville
        fait vite baisser l'addition 💡
      </p>
    </div>
  );
}

function PriceLevel({ level }: { level: 1 | 2 | 3 }) {
  return (
    <span className="text-sm font-semibold" aria-label={`Prix : ${level} sur 3`}>
      <span className="text-turquoise">{"€".repeat(level)}</span>
      <span className="text-muted/40">{"€".repeat(3 - level)}</span>
    </span>
  );
}

function RestaurantCard({ r }: { r: Restaurant }) {
  return (
    <article className="rounded-2xl border border-line bg-card p-4 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-elevated text-xl">
            {r.emoji}
          </span>
          <div className="min-w-0">
            <h3 className="font-display text-lg font-semibold leading-tight text-ink">
              {r.name}
            </h3>
            <p className="text-xs font-medium text-turquoise">{r.category}</p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-0.5">
          <PriceLevel level={r.price} />
          {r.rating && (
            <span className="inline-flex items-center gap-0.5 text-xs text-muted">
              <Star className="h-3 w-3 fill-sand text-sand" aria-hidden />
              {r.rating.toFixed(1)}
            </span>
          )}
        </div>
      </div>

      <p className="mt-2 text-sm leading-relaxed text-muted">{r.description}</p>

      <div className="mt-2 flex items-center gap-1.5 text-xs text-muted/80">
        <MapPin className="h-3.5 w-3.5 shrink-0 text-turquoise" aria-hidden />
        <span className="min-w-0">
          <span className="text-ink/80">{r.area}</span> · {r.address}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-muted">{r.priceNote}</span>
        <RestaurantMapButton
          name={r.name}
          embedUrl={toMapsEmbedUrl(r.mapsUrl)}
          directUrl={toMapsAppUrl(r.mapsUrl)}
        />
      </div>
    </article>
  );
}
