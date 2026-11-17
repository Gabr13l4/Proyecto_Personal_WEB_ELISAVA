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
