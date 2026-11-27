# Registre de canvis (Log)

Aquest fitxer documenta els canvis rellevants del projecte, del més recent al més antic.

## Quan cal afegir una entrada?

Afegeix una entrada quan un canvi:
- modifica el contingut o el comportament de la web;
- afegeix, elimina o reorganitza fitxers;
- corregeix un error;
- canvia el disseny, l'accessibilitat o la compatibilitat;
- modifica una decisió tècnica o un requisit del projecte.

No cal registrar cada petit retoc tipogràfic ni canvis automàtics sense impacte. Agrupa canvis petits relacionats en una sola entrada.

## Procés recomanat

1. Abans d'acabar una tasca, comprova què has modificat amb `git diff` o revisant els fitxers a GitHub.
2. Si el canvi és rellevant, afegeix una entrada nova **a dalt del registre**, just després d'aquestes instruccions i abans de les entrades antigues.
3. Utilitza la data del dia en format ISO: `AAAA-MM-DD`.
4. Escriu què ha canviat i per què, en punts breus. Anota incidències o tasques pendents només si n'hi ha.
5. Inclou `log.md` en el mateix commit que el canvi documentat, sempre que sigui pràctic.
6. Abans de fer el commit, comprova que l'entrada sigui fidel als canvis reals. No anotis tasques com a completades si no s'han verificat.

## Format de cada entrada

```markdown
## AAAA-MM-DD — Títol breu del canvi
- **Canvis:** què s'ha afegit, modificat o corregit.
- **Motiu:** quin objectiu té el canvi.
- **Verificació:** com s'ha comprovat (si escau).
- **Pendents/incidències:** només si n'hi ha.
```

Omet els camps que no siguin pertinents. Mantén les entrades concises i orientades a resultats.

---

## 2026-11-27 — Simplify the map and connect the visual flow
- **Changes:** Replaced the detailed street basemap with a dark, hand-shaped world illustration in the project palette; kept gluten-free place markers, place search, and area search. Added more small animated stars across all four sections and softened the color transitions between sections.
- **Why:** Keep attention on gluten-free places and make the experience feel more cohesive and playful.
- **Verification:** Pending live page review.

## 2026-11-27 — Route map searches to regional OpenStreetMap services
- **Canvis:** Routed gluten-free place searches to the OpenStreetMap regional Overpass service that covers the map center, while retaining a manual search button, a short timeout, and area caching.
- **Motiu:** Avoid relying on one overloaded worldwide query endpoint for every continent.
- **Verificació:** Checked that city search and filter controls are wired; live results depend on tagged OpenStreetMap coverage and regional service availability.

## 2026-11-27 — Add playful visual details and stronger prompts
- **Canvis:** Added animated star accents, soft color orbits, varied type emphasis, hover feedback, and clearer prompts to explore the map, tracker, and shared-care threads. Kept the project palette and respected reduced-motion preferences.
- **Motiu:** Make the full site more lively and invite visitors to interact with its tools.

## 2026-11-27 — Replace the sample Celiac map with a live world map
- **Canvis:** Added an interactive Leaflet world map with a plum-and-lavender-tinted OpenStreetMap basemap, city search, area-based gluten-free listings, dedicated-GF / dining / shop filters, map markers, and links to source records. Added a visible note that searches go to OpenStreetMap services. Added a clear note about incomplete community tags and venue safety verification.
- **Motiu:** Make the Celiac section useful for exploring real mapped gluten-free options around the world.
- **Verificació:** Reviewed the source and connected it to the OpenStreetMap `diet:gluten_free` tag; live data availability depends on community mapping.

## 2026-11-27 — Enlarge the diary and save every wellbeing log
- **Canvis:** Made the diary a larger, rounded card matching the zipper panel, with a roomier calendar and writing area. Daily wellbeing scores and notes save automatically per date, restore when the routine tab is reopened, and remain visible in a saved-log list. Date labels use English regardless of browser locale.
- **Motiu:** Keep the website language consistent and make daily entries easy to write and revisit.

## 2026-11-27 — Refine the emotion zipper and save each change
- **Canvis:** Rebuilt the check-in card around the Figma layout with the original plum, paper, coral, and lavender palette. Mood slider changes now save immediately per selected date; choosing a calendar day restores its sliders and note.
- **Motiu:** Make the tracker feel closer to the supplied prototype and keep daily entries available after refresh in the same browser.
- **Verificació:** Updated the published HTML, CSS, and JavaScript references with a fresh asset version; checked the published tracker and tightened the calendar, journal, and tracker card to fit narrow phone screens.

## 2026-11-27 — Expand Hashimoto’s self-tracking tools
- **Canvis:** Reworked the mood check-in as an emotion zipper with four sliders; added a calendar journal, medication-period timeline, and daily wellbeing log. Entries are saved in the visitor’s browser. Added versioned asset URLs so the updated styles and interactions load without stale browser cache.
- **Motiu:** Bring the Hashimoto’s section closer to the supplied interactive prototype and make the daily tools useful beyond a single visit.

## 2026-11-25 — Route condition choices to dedicated sections
- **Canvis:** Added a Celiac section, kept the existing Hashimoto’s tools in their own section, and renamed the shared-care destination to In Common.
- **Motiu:** Give each home-page topic choice a dedicated place for current and future content.
- **Verificació:** Clicked Celiac, In common, and Hashimoto’s on the published page and confirmed each navigates to its matching section.

## 2026-11-24 — Darkened section 03 with a continuous fade
- **Canvis:** Changed section 03 to deep plum, updated text and cards for contrast, and made section 02 fade into the same plum at its lower edge on desktop and mobile.
- **Motiu:** Give the Intersection section a darker canvas without a hard divider between sections 02 and 03.

## 2026-11-24 — Blend sections 02 and 03
- **Canvis:** Added a lavender glow at the bottom of section 02 and a matching orbit and gradient at the top of section 03, with a tighter version on mobile.
- **Motiu:** Make the handoff between the Hashimoto’s tools and Intersection explorer feel intentional and continuous.

## 2026-11-24 — Smoother transitions across scrolls
- **Canvis:** Added a subtle lavender fade at the hero’s lower edge and soft coral/lavender gradients through the Hashimoto’s and Intersection sections.
- **Motiu:** Carry the same color and orbit language across section boundaries.

## 2026-11-24 — Third scroll: The Intersection
- **Canvis:** Added an interactive connection explorer for shared symptom questions, food/dining decisions, and medication/meal routines, plus navigation from the second scroll.
- **Motiu:** Bring the repository’s tri-mode “The Intersection” concept and fragmented-care narrative into the page.
- **Verificació:** Reviewed the section structure and connected each topic control to its copy and discussion prompt.

## 2026-11-18 — Smoother transition between scrolls
- **Canvis:** Added a gradual plum-to-alabaster transition and carried the orbit detail and lavender accents into the Hashimoto’s section.
- **Motiu:** Make both scrolls feel like one continuous visual identity while keeping the second section lighter.

## 2026-11-18 — Hashimoto’s second scroll and tool prototypes
- **Canvis:** Added a light Hashimoto’s section with interactive symptom check-in, personal routine form, and searchable food prompts; updated project context and memory.
- **Motiu:** Turn the three MVP utility concepts into an explorable second screen.
- **Verificació:** Reviewed HTML section structure and wired tool switching, range values, routine summary, and finder filtering in the page script.
- **Pendents/incidències:** Browser preview reload was unavailable in this environment; final visual review remains pending.

## 2026-11-18 — First-screen landing page
- **Canvis:** Reworked `index.html`, `style.css`, and `script.js` into a responsive first-screen hero with the Celiac / In common / Hashimoto’s selector, expandable research question, and dark plum canvas with adapted contrast.
- **Motiu:** Translate the project’s visual identity and connected-care concept into the first view of the website.
- **Verificació:** Reviewed the updated source and checked that the controls expose their selected and expanded states accessibly.

## 2026-11-02 – Revisió inicial i documentació
•⁠  ⁠*Canvis:* revisats ⁠ README.md ⁠, ⁠ index.html ⁠, ⁠ style.css ⁠ i ⁠ script.js ⁠; afegits ⁠ memoria.md ⁠, ⁠ context.md ⁠ i aquest registre.
•⁠  ⁠*Motiu:* documentar l'estructura inicial i establir una base per al manteniment.
•⁠  ⁠*Verificació:* llegits els quatre fitxers originals; identificada una pàgina HTML bàsica amb CSS i JavaScript.
•⁠  ⁠*Pendents/incidències:* definir el contingut definitiu de la pàgina i millorar el disseny.

## 2026-11-17 — Project definition, research synthesis & initial content update
- **Canvis:** Updated `context.md`, `memoria.md`, and `index.html` with the project title (*Dual Autoimmunity: Celiac & Hashimoto’s*), descriptive summary, primary research question, 4Q narrative, MVP feature definitions, and Figma color palette (`#31263E`, `#FBF5F3`, `#FF8552`, `#8765DD`).
- **Motiu:** Adapt the starter template to the specific research findings, UX architecture (tri-mode toggle), and visual identity defined for bridging Celiac Disease and Hashimoto’s Thyroiditis.
- **Verificació:** Reviewed updated Markdown files and HTML structure on GitHub to confirm formatting and intact `#boton` / `#texto` IDs.
- **Pendents/incidències:** Implement the split-screen Figma layout, central toggle slider (`Celiac | Intersection | Hashimoto's`), and custom color styles in `style.css` and `script.js`.


## 2026-11-27 — Interactive gluten-free world map and playful visual refresh
- **Changes:** Added an interactive Leaflet world map with place search, area search, category filters, and community-mapped gluten-free listings; refined the project-color map treatment and added playful stars, shapes, stronger type hierarchy, and small interaction details across the site. Updated the Celiac map instructions and kept the interface in English.
- **Why:** Make the Celiac section useful for discovering nearby options and bring more energy to the whole experience while staying within the project palette.
- **Verification:** Confirmed on the published page that the map loaded and returned mapped places for the searched area; confirmed the current map and page assets loaded. Source includes OpenStreetMap attribution and a clear note that tags are incomplete and are not safety certifications.
- **Notes:** Coverage depends on OpenStreetMap tags and the public regional Overpass service; results are not Find Me Gluten Free reviews and should be checked directly with each venue.
