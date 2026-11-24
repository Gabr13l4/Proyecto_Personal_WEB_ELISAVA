# Memòria del projecte

## Objectiu
This project is a unified digital platform designed for individuals diagnosed with co-occurring **Celiac Disease** and **Hashimoto’s Thyroiditis**. 

- **Primary Research Question:** *How can a unified digital platform effectively bridge the gap between Celiac Disease and Hashimoto’s Thyroiditis to simplify dietary compliance, symptom tracking, and joint disease management?*
- **Problem & User Need:** Patients currently face fragmented information (juggling gluten-free apps like *Find Me Gluten Free* and thyroid forums like *MamHashi*), cross-symptom confusion (fatigue, brain fog), and the "absorption catch-22" between levothyroxine timing and gluten-induced malabsorption.
- **Narrative (4Q):** The platform serves users exhausted by split medical advice by unifying safe dining discovery, hormone-mood tracking, and medication scheduling into one dashboard—leaving them feeling empowered, organized, and relieved.
- **Tone & Values:** Warm, supportive, scientifically grounded, and clear.

## Estructura actual
- `index.html`: Dark plum landing hero followed by a lighter Hashimoto’s tools section and a third interactive “The Intersection” section for shared symptom questions, food decisions, and medication/meal routines.
- `style.css`: Responsive layouts using the custom palette (`#31263E`, `#FBF5F3`, `#FF8552`, `#8765DD`), carrying the connected visual system through all three scrolls.
- `script.js`: Working hero mode toggle, research-question reveal, tool tabs and utilities, and interactive intersection prompts.

## Decisions actuals
- Maintain a clean, lightweight architecture without heavy frameworks.
- **Tri-Mode UX Architecture:** Split the interface into clear *Celiac* and *Hashimoto’s* views connected by an active *"The Intersection"* hub to explain cross-consequences rather than offering static articles.
- **Visual Identity (Figma):** Selected a calming, reassuring color system: Deep Plum (`#31263E`) for typography/anchors, Warm Alabaster (`#FBF5F3`) as the background canvas, Warm Coral (`#FF8552`) for CTAs/Celiac highlights, and Soft Lavender (`#8765DD`) for hormone harmony/Hashimoto’s accents.
- **Core MVP Utilities Defined:** Conceptualized three actionable tools: *Mind-Body Autoimmune Tracker*, *Medication Absorption & Meal Scheduler*, and *Combined Interactive Restaurant/Product Finder*.
- **Prototype Boundaries:** Check-ins and schedule entries remain in the current page session only. The schedule reflects user-entered times without recommending timing or sending alerts; the finder offers questions to ask rather than food safety claims.
- **Intersection Explorer:** The third scroll groups shared symptom questions, food/dining decisions, and medication/meal questions as prompts for users and their care teams, rather than claiming a diagnosis or cause.
## Pendents
- Review the first two scrolls against the Figma reference and refine visual details.
- Decide whether future versions should persist user entries and, if so, define privacy handling and medical disclaimer compliance for lab results (TSH, FT3, FT4) and symptom logs.
