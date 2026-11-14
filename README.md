# Viro Calculator Suite (PWA)

A modular, installable Progressive Web App for clinical and molecular virology lab calculations, hosted on GitHub Pages with **network-first** updates.

## Structure
- `index.html` — Hub page linking to all calculators
- `manifest.json` — PWA metadata
- `sw.js` — Network-first service worker (bump `CACHE_NAME` when you add files)
- `icon.png` — 512×512 app icon
- `images/theme-bg.jpg` — Page background artwork
- `css/main.css` — Shared theme (each page picks its accent colour with `<body data-theme="...">`)
- `calculators/`
  - `realstar-vl.html` — Altona RealStar® Viral Load (blue)
  - `altona-mastermix.html` — Master Mix Prep (violet)
  - `neubauer-calc.html` — Neubauer chamber & cell splitting (teal)
  - `fumigation-calc.html` — Room fumigation (orange)
  - `dengue-elisa.html` — Dengue IgM / NS1 ELISA, full-width workstation (rose / indigo)

## Deployment on GitHub Pages
1. Upload all files and folders to the repository root.
2. **Settings → Pages** → deploy from `main` (`/ (root)`).
3. Open the live URL and choose **Install App** / **Add to Home Screen**.
