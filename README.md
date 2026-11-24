# Daniela Ivanka Maydina Siringoringo — Portfolio

A static, responsive **personal portfolio** for GitHub Pages, including a selection of project case studies and supporting images.

## Where are the images?

All **55** embedded project/profile/certificate images from the previous single-file portfolio have been extracted as genuine image files under `assets/`. The repository also contains `assets/favicon.svg`.

```
index.html
assets/
  achievements/             # Techaton Juara 2 certificate + LCC evidence
  certificates/             # Other certificates in the previously published portfolio
  profile/                  # Approved profile image
  bless-v69/                # 10 curated screenshots, prototype/demo only
  damai/                    # DaMai gallery images
  jejak-baca/               # JEJAK BACA UI images
  ternax/                   # TernaX gallery images
  techaton/                 # Techaton prototype documentation
  aero-co/                 # AERO-CO concept images
  css/style.css
  js/site-data.js
  js/main.js
  favicon.svg
.nojekyll
.gitignore
README.md
PANDUAN_UPLOAD_GITHUB.txt
MANIFEST_ASSETS.csv
```

## Selected work and achievement

- **BLESS Industrial Hub / Prokons:** Independently developed Node.js/SQLite-backed web application **prototype** with catalog, customer ordering, admin dashboard, inventory, RFQ, and reporting. This portfolio shares *screenshots* only, not the original application source code or database.
- **Techaton IoT Competition 2025:** **Juara 2**, team **Tim Cihuy**, based on supplied certificate (under `assets/achievements/techaton_second_place.jpg`).
- **DaMai:** Academic K-Means customer-segmentation prototype using synthetic records.
- Further team, research, UX, and concept projects remain described on the site.

## Security and accuracy

- **DO NOT upload** `bless_final_v69.zip`, its `server.js`, SQLite database, `.env`, secrets, internal source or real customer records to this public portfolio repository. None are included in this ZIP.
- Sales metrics and customer data shown in BLESS screenshots are **synthetic demo data**, not audited company performance.
- Publishing screenshots and company branding requires appropriate approval from PT Bless; please confirm that before making the repository public.
- All images in a public GitHub Pages site are downloadable by visitors, even though the application backend isn't included.
- Research manuscripts under review must not be presented as accepted or published.

## Deployment

1. Extract **all ZIP contents**, keeping the `assets/` folder and its subfolders intact.
2. Create an empty **Public** GitHub repository.
3. Upload `index.html`, the complete `assets` folder, `.nojekyll`, and the supporting text files to the **repository root**, not to a nested project folder.
4. GitHub → **Settings → Pages → Deploy from a branch → main → /(root) → Save**.
5. Review desktop and mobile pages and click the BLESS gallery and Techaton certificate.

This is a self-contained **static portfolio website** requiring no database or Node.js backend.

## Gray and white theme (November 2026)

This version updates **colors only**: the page canvas is light gray, project cards and project detail views are white, primary text is near black, and accent colors are restrained navy. The existing sections, copy, layout, fonts, galleries and other project files are unchanged.
