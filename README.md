# Portfolio

Static portfolio site (plain HTML/CSS/JS, no build step), hosted on GitHub Pages.

## Structure

- `index.html` — home page: intro, project cards, contacts
- `projects/*.html` — one page per project
- `images/` — cover images (`encased.jpg`, `atomic-heart.jpg`, `tenet-of-the-spark.jpg`)
- `assets/style.css`, `assets/site.js` — styles, auto-generated table of contents

## Publish

Settings → Pages → Source: **Deploy from a branch**, branch `main`, folder `/ (root)`.
The site will be available at `https://dmitryvolgin.github.io/portfolio/`.

## Analytics

Umami Cloud script is included in every page `<head>` (website ID `734f66b2-72e3-453f-8a4b-711d15af3ee4`).

Clicks on project cards, Steam links, Email and LinkedIn are already tagged with `data-umami-event` attributes, so they show up as events in the Umami dashboard.
