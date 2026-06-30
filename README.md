# 🇭🇷 Croatie 2026

PWA de voyage pour notre semaine en Croatie (**1 → 8 juillet 2026**). Programme jour
par jour, transports, budget et infos utiles — **installable sur l'écran d'accueil** et
**utilisable hors-ligne**.

Construite avec **Next.js 14 (App Router)**, **Tailwind CSS**, **Lucide React** et
**@ducanh2912/next-pwa**. Aucune API externe : toutes les données sont en local
(`/data`).

---

## 🚀 Démarrage

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer en développement (http://localhost:3000)
npm run dev

# 3. Build de production (génère aussi les icônes + le service worker)
npm run build

# 4. Lancer le build en local
npm start
```

> Le service worker est **désactivé en dev** et activé automatiquement en production.
> Les icônes PWA sont régénérées avant chaque build (`prebuild` → `scripts/generate-icons.mjs`).
> Pour les régénérer manuellement : `npm run icons`.

---

## ☁️ Déploiement sur Vercel (gratuit)

```bash
# Première fois : se connecter
npx vercel login

# Déployer en production
npx vercel --prod
```

Vercel détecte automatiquement Next.js (voir `vercel.json`). À la fin, tu obtiens une
URL du type `https://croatie-2026.vercel.app` — **c'est cette URL à partager** avec ta
copine pour qu'elle installe l'app de son côté.

---

## 📲 Ajouter à l'écran d'accueil

### iPhone (Safari)
1. Ouvrir l'URL Vercel dans **Safari** (obligatoire, pas Chrome).
2. Toucher le bouton **Partager** (carré avec flèche vers le haut).
3. Choisir **« Sur l'écran d'accueil »**.
4. Valider — l'icône « Croatie » apparaît, l'app s'ouvre en plein écran.

### Android (Chrome)
1. Ouvrir l'URL Vercel dans **Chrome**.
2. Menu **⋮** (trois points en haut à droite).
3. **« Ajouter à l'écran d'accueil »** (ou bannière « Installer l'application »).
4. Confirmer.

Une fois installée et ouverte une première fois **avec connexion**, l'app fonctionne
**hors-ligne** (le réseau reste nécessaire uniquement pour ouvrir les liens Google Maps).

---

## 🗂️ Structure

```
app/
  page.tsx              → redirige vers /aujourd-hui
  aujourd-hui/          → vue du jour (J-X avant / jour en cours / voyage terminé)
  programme/            → liste des 8 jours
  budget/               → tracker de dépenses (localStorage)
  infos/                → urgences, contacts, tips
  jour/[id]/            → détail d'un jour (pré-généré au build)
components/
  BottomNav, ActivityCard, TransportCard, AccommodationCard,
  DayTimeline, BudgetBadge, ui (badges & boutons)
data/
  days.ts               → programme complet (typé)
  accommodations.ts     → hébergements
  types.ts              → types partagés
lib/
  date.ts, budget.ts, utils.ts
public/
  manifest.json + icônes générées
scripts/
  generate-icons.mjs    → génère les PNG depuis un SVG
```

## ✨ Fonctionnalités

- **Aujourd'hui** : détecte la date du téléphone (J-X avant le départ, programme du jour
  pendant le voyage, « Voyage terminé » après le 8 juillet).
- **Timeline** par jour : transport, hébergement du soir, activités avec badges
  (🟢 gratuit / 🟡 payant / 🔵 transport / 🍽️ repas / ✨ optionnel).
- **Prix par personne ET total ×2** affichés partout.
- **Badges** « À réserver » (plongée, remparts de Dubrovnik, Krka) et « Réduc étudiant ».
- **Alternatives** repliables sous les activités concernées.
- **Liens Google Maps** cliquables sur chaque adresse.
- **Budget tracker** local (cible 100 €/jour pour deux), persistance `localStorage`.
- **Offline-first** via service worker + précache.

Bon voyage ! 🏖️
