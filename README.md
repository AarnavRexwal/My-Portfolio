# Aarnav Rexwal — Portfolio

Personal portfolio of **Aarnav Rexwal**, a Java and Spring Boot developer from Lucknow, India. Final-year B.Tech (Computer Science) student at DSMNRU and IT Application Development & Support intern at Transsion India.

**Live site:** _add your Vercel link here after deploying_

## What's on the site

- **Home:** a hero with a halftone portrait and a lattice that lights up under the cursor, what I'm doing now, two featured projects, my toolbox, how I got here, what I care about, and contact details.
- **BlogSpace case study:** an animated request path from the browser to React on Vercel, Nginx on AWS EC2, the Spring Boot API and MySQL on AWS RDS.
- **Presence case study:** screens from an employee attendance and payroll system (sample data), plus a small attendance sheet you can click through.
- **Small touches:** English and Hindi greeting toggle, a "Motion on/off" switch, keyboard focus styles, and support for reduced-motion settings.

## Projects featured

| Project | Stack | Links |
|---|---|---|
| BlogSpace | Java, Spring Boot, JWT, MySQL on AWS RDS, React, Vite, Nginx, AWS EC2, Vercel | [Live site](https://blog-app-frontend-chi-brown.vercel.app/) · [API](https://github.com/AarnavRexwal/Blog-app-apis) · [Frontend](https://github.com/AarnavRexwal/blog-app-frontend) |
| Presence | Java, Spring Boot, React, MySQL | [Live site](https://hrms-fronted-two.vercel.app) · Code in private repos |

## Tech

Plain HTML, CSS and JavaScript. No framework and no build step.

- Fonts from Google Fonts: Fraunces, Bricolage Grotesque, JetBrains Mono, Kalam
- Images are WebP; the portraits were processed into a halftone style
- CSS custom properties for the colour palette, CSS `@view-transition` for page changes

## Project structure

```
.
├── index.html              Home page
├── work/
│   ├── blogspace.html      BlogSpace case study
│   └── presence.html       Presence case study
└── assets/
    ├── css/style.css       All styles
    ├── js/main.js          Hero motion, greeting toggle, attendance demo
    ├── img/                Portraits and Presence screenshots
    ├── favicon.svg
    └── Aarnav_Rexwal_Resume.pdf
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

## Deploy

**Vercel (what I use)**

1. Push this repo to GitHub.
2. On [vercel.com](https://vercel.com), choose Add New, then Project, and import the repo.
3. Set Framework Preset to **Other**. Leave Build Command and Output Directory empty.
4. Click Deploy.

It also works on Netlify, Cloudflare Pages and GitHub Pages, because every link is relative.

## Contact

- Email: aarnavrexwal9@gmail.com
- LinkedIn: [linkedin.com/in/aarnav-rexwal-a05599411](https://www.linkedin.com/in/aarnav-rexwal-a05599411)
- GitHub: [@AarnavRexwal](https://github.com/AarnavRexwal)

## Notes

- Presence screenshots use sample data, not real employee records.
- Photos and the resume PDF are personal. Please don't reuse them.