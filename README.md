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

1. Create a free account at https://cloud.umami.is and add the site.
2. In every HTML file, paste the Website ID into the commented-out Umami line in `<head>` and uncomment it.

Clicks on project cards, Steam links, Email and LinkedIn are already tagged with `data-umami-event` attributes, so they show up as events once analytics is enabled.
