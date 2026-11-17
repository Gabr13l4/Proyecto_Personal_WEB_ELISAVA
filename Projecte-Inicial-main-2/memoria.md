# Memòria del projecte

## Objectiu
This project is a unified digital platform designed for individuals diagnosed with co-occurring **Celiac Disease** and **Hashimoto’s Thyroiditis**. 

- **Primary Research Question:** *How can a unified digital platform effectively bridge the gap between Celiac Disease and Hashimoto’s Thyroiditis to simplify dietary compliance, symptom tracking, and joint disease management?*
- **Problem & User Need:** Patients currently face fragmented information (juggling gluten-free apps like *Find Me Gluten Free* and thyroid forums like *MamHashi*), cross-symptom confusion (fatigue, brain fog), and the "absorption catch-22" between levothyroxine timing and gluten-induced malabsorption.
- **Narrative (4Q):** The platform serves users exhausted by split medical advice by unifying safe dining discovery, hormone-mood tracking, and medication scheduling into one dashboard—leaving them feeling empowered, organized, and relieved.
- **Tone & Values:** Warm, supportive, scientifically grounded, and clear.

## Estructura actual
- `index.html`: Page structure featuring the project title, descriptive summary, primary research question, and split-screen layout foundation.
- `style.css`: Visual styling applying clean sans-serif typography, soft rounded card components, and the custom color palette (`#31263E`, `#FBF5F3`, `#FF8552`, `#8765DD`).
- `script.js`: Interactive behavior for revealing the research question and powering the tri-mode navigation toggle (`Celiac | Both / Intersection | Hashimoto's`).

## Decisions actuals
- Maintain a clean, lightweight architecture without heavy frameworks.
- **Tri-Mode UX Architecture:** Split the interface into clear *Celiac* and *Hashimoto’s* views connected by an active *"The Intersection"* hub to explain cross-consequences rather than offering static articles.
- **Visual Identity (Figma):** Selected a calming, reassuring color system: Deep Plum (`#31263E`) for typography/anchors, Warm Alabaster (`#FBF5F3`) as the background canvas, Warm Coral (`#FF8552`) for CTAs/Celiac highlights, and Soft Lavender (`#8765DD`) for hormone harmony/Hashimoto’s accents.
- **Core MVP Utilities Defined:** Conceptualized three actionable tools: *Mind-Body Autoimmune Tracker*, *Medication Absorption & Meal Scheduler*, and *Combined Interactive Restaurant/Product Finder*.
## Pendents
- Translate the Figma split-screen wireframe and central toggle slider (`Celiac | Intersection | Hashimoto's`) into `index.html`, `style.css`, and `script.js`.
- Prioritize one of the three interactive utilities (Tracker, Scheduler, or Finder) as the primary functional MVP prototype.
- Define data privacy handling (local storage vs. backend) and medical disclaimer compliance for user-entered lab results (TSH, FT3, FT4) and symptom logs.
