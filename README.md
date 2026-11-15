# Viro Calculator Suite (PWA)

A modular, installable Progressive Web App for clinical and molecular virology lab calculations, hosted on GitHub Pages with **network-first** updates.

## Structure
- `index.html` — Hub page linking to all calculators
- `manifest.json` — PWA metadata
- `sw.js` — Network-first service worker (bump `CACHE_NAME` when you add files)
- `icon.png` — 512×512 app icon
- `images/bg-*.webp` — Background artwork cut into separate transparent layers (DNA, virus, hex, calculator, wave) so phone and desktop can lay them out differently
- `icons/` — PWA icons (192/512 any + maskable, apple-touch-icon, favicon)
- `css/shell.css`, `js/shell.js` — App shell: desktop sidebar, phone app bar + bottom nav + tools sheet, install button
- `js/common.js` — Shared helpers (number formatting, tabs, storage)
- `css/main.css` — Shared theme (each page picks its accent colour with `<body data-theme="...">`)
- `calculators/`
  - `realstar-vl.html` — Altona RealStar® Viral Load (blue)
  - `altona-mastermix.html` — Master Mix Prep (violet)
  - `neubauer-calc.html` — Neubauer chamber & cell splitting (teal)
  - `fumigation-calc.html` — Room fumigation (orange)
  - `dengue-elisa.html` — Dengue IgM / NS1 ELISA, full-width workstation (rose / indigo)
  - `chik-igm-elisa.html` — InBios CHIKjj Detect™ IgM ELISA, duplicate NC/PC/CC + 10 samples (pink)
  - `generic-elisa.html` — Any ELISA with a per-kit cut-off formula, S/CO ratio, saved kits (lime)
  - `qpcr-tools.html` — Standard curve Ct → copies, slope ⇄ efficiency, copies ⇄ IU, log reduction (indigo)
  - `viral-titer.html` — TCID₅₀ (Reed–Muench & Spearman–Kärber) and plaque-assay PFU/mL (green)
  - `moi-calc.html` — Virus volume for a target MOI (purple)
  - `dilution-calc.html` — C₁V₁ = C₂V₂ and serial dilution builder (cyan)
  - `rcf-calc.html` — Centrifuge RPM ⇄ RCF (gold)

## Deployment on GitHub Pages
1. Upload all files and folders to the repository root.
2. **Settings → Pages** → deploy from `main` (`/ (root)`).
3. Open the live URL and choose **Install App** / **Add to Home Screen**.
