# Manju Mukesh — Developer Portfolio

A polished, corporate-ready personal portfolio website built with pure HTML5, CSS3, and Vanilla JavaScript — featuring a **light/dark theme toggle**, a built-in **AI assistant**, and an in-page **certificate viewer**.

![Portfolio Preview](portfolio.png)

---

## 👤 About

Portfolio website for **Dannina Manju Mukesh** — CSE Undergraduate at Aditya College of Engineering & Technology, Full-Stack Developer, and AI Enthusiast. Built to showcase projects, skills, certifications, and experience to recruiters and collaborators.

---

## ✨ Features

- **Clean Light Minimal design** — Apple / Linear-inspired aesthetic: airy whitespace, a single restrained indigo accent, and crisp modern typography
- **Light / Dark theme toggle** — Sun/moon switch in the nav; remembers the visitor's choice (`localStorage`) and applies it **before first paint** to avoid any flash. The background canvas re-themes live.
- **AI Assistant** — A built-in chat widget (trained on Manju's portfolio) that gives visitors a quick brief on projects, skills, certifications, experience, and contact — with suggestion chips and quick-action buttons
- **Certificate Viewer** — Every certificate with a file has a **View** button that opens the PDF in an in-page modal (with Open / Download / close), plus a **Download** button
- **Certifications & Badges** — Credential cards with credential *type*, issuer, issue/validity dates, verification links, and official badge images
- **Internship Experience** — Technical Hub Pvt. Ltd. full-stack internship, with a viewable/downloadable certificate
- **Custom Page Loader** — Animated ring loader with letter-by-letter name reveal and progress bar
- **Custom Cursor** — Interactive cursor with trail effect (desktop)
- **Scroll Progress Bar** — Visual reading progress indicator at the top of the page
- **Geometric Canvas Background** — Theme-aware animated particle grid drawn on HTML5 Canvas
- **Gradient Mesh Orbs** — Floating ambient background orbs
- **Responsive Navigation** — Active-section indicator with smooth scroll, plus a hamburger mobile menu
- **Hero Section** — Typewriter effect, animated stats counter, floating photo with orbiting elements, and floating tech chips
- **About Section** — Syntax-highlighted code block alongside a personal bio
- **Journey Timeline** — Cards for education, internship, projects, and hackathon experiences
- **Projects Section** — Detailed project cards with tech stacks, highlights, and links
- **Skills Section** — Tech pill tags with proficiency levels, plus Core CS concepts
- **Scrolling Tech Marquee** — Infinite-loop ticker of technologies
- **Contact Section** — Contact info cards + a functional form powered by Web3Forms
- **Footer & Back-to-Top Button**

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (custom properties, theming, glassmorphism, animations) |
| Scripting | Vanilla JavaScript (ES6+) |
| Rendering | HTML5 Canvas API |
| Fonts | Google Fonts — Inter, JetBrains Mono |
| Contact Form | [Web3Forms](https://web3forms.com/) |

No frameworks. No build tools. Zero dependencies.

---

## 📁 Project Structure

```
portfolio/
├── index.html                     # Main HTML document
├── style.css                      # All styles, theming, and animations
├── script.js                      # All interactivity, AI assistant, and JS logic
├── logo.png                       # Nav logo image
├── manju-photo.png                # Hero profile photo
├── project-skillstack.png         # SkillStack AI project screenshot
├── project-portal.png             # Student Affairs Portal screenshot
├── portfolio.png                  # Portfolio project screenshot
├── Manju_Mukesh_Resume_ATS.pdf    # Downloadable CV (root)
├── badges/                        # Certification badge images (square PNGs)
│   ├── oci-ai-foundations.png
│   ├── oracle-data-platform.png
│   ├── oracle-java.png
│   ├── google-ai.png
│   ├── it-specialist-html-css.png
│   ├── gemini-ai.png
│   └── c-essentials.png
└── certificates/                  # Downloadable / viewable certificate PDFs
    ├── oracle-oci-ai-foundations.pdf
    ├── oracle-data-platform.pdf
    ├── oracle-java-foundations.pdf
    ├── it-specialist-html-css.pdf
    └── technical-hub-internship.pdf
```

> **Note:** Badge images should be roughly **square (1:1)** so they render evenly in the cards. Certificate **View** buttons preview PDFs inline; the résumé (`Manju_Mukesh_Resume_ATS.pdf`) must stay in the project root for the "Download CV" buttons to work.

---

## 🎨 Theming

The stylesheet is fully theme-driven via CSS custom properties:

- **Light** is the default (`:root`).
- **Dark** overrides live under `:root[data-theme="dark"]` — a refined professional dark palette (deep navy surfaces, lighter indigo accent for contrast).
- The active theme is stored in `localStorage` under the key `theme` (`"light"` / `"dark"`), and a small inline script in `<head>` applies it before paint to prevent a flash of the wrong theme.

---

## 🚀 Getting Started

No installation or build step required.

1. **Clone or download** this repository.
2. Keep the folder structure intact — `badges/` and `certificates/` alongside `index.html`, and the résumé PDF in the root.
3. Open `index.html` directly in any modern browser — or serve it locally:

```bash
# Using Python
python -m http.server 8080

# Using Node.js (npx)
npx serve .
```

Then visit `http://localhost:8080`.

> **Tip:** For inline PDF previews (the certificate **View** modal) to render most reliably, serve the site over HTTP rather than opening via `file://`.

---

## 📬 Contact Form Setup

The contact form uses **Web3Forms**. The access key is already embedded in `index.html`. To use your own:

1. Sign up at [web3forms.com](https://web3forms.com/) and get a free access key.
2. In `index.html`, replace the value in:
   ```html
   <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
   ```

---

## 🏆 Featured Projects

### SkillStack AI — Career Launchpad
Full-stack placement prep platform with 11 Flask Blueprint modules, AI mock interviews, MediaPipe FaceMesh biometric analytics, a 5-step RAG pipeline for ATS-optimized resumes, and a 4-tier AI fallback chain (Gemini → OpenAI → OpenRouter → NVIDIA).
**Stack:** Python · Flask · MongoDB Atlas · Gemini AI · Firebase · React.js · MediaPipe · LangChain

### Centralized Student Affairs & Club Portal
Administrative dashboard for the Dean of Student Affairs featuring RBAC, Chart.js analytics, RESTful file-handling APIs, and automated NAAC-compliant PDF/Excel reporting.
**Stack:** Python · Flask · React.js · Tailwind CSS · MongoDB · Chart.js · SheetJS

### Premium Developer Portfolio
This website — theme toggle, AI assistant, certificate viewer, theme-aware particle canvas, custom cursor, and zero dependencies.
**Stack:** HTML5 · CSS3 · Vanilla JS · Canvas API

---

## 🎓 Certifications

| Type | Certification | Issuer |
|---|---|---|
| Cloud & AI | Oracle Cloud Infrastructure 2025 — AI Foundations Associate | Oracle University |
| Data & Cloud | Oracle Data Platform 2025 — Foundations Associate | Oracle University |
| Programming | Oracle Certified Foundations Associate — Java | Oracle University |
| Artificial Intelligence | Google AI Professional Certificate | Google · Coursera |
| Web Development | IT Specialist — HTML & CSS | Pearson · Certiport |
| Artificial Intelligence | Gemini AI Foundational Associate | Google · STAR Academy |
| Programming | C Essentials 1 & 2 | Cisco Networking Academy |

## 💼 Experience

**Full-Stack Developer Intern** — Technical Hub Pvt. Ltd. (Summer 2026)
Built MERN-stack applications using **React**, **Express.js**, and **MongoDB**. Intern ID: THSI260810.

---

## 📜 License

© 2026 Dannina Manju Mukesh. All rights reserved.

---

## 📞 Contact

- **Email:** 24P31a0585@acet.ac.in
- **Phone:** +91 9490692101
- **LinkedIn:** [linkedin.com/in/manjumukeshdannina](https://www.linkedin.com/in/manjumukeshdannina)
- **GitHub:** [github.com/true-tune-27](https://github.com/true-tune-27)
- **Location:** Surampalem, AP, India 🇮🇳
