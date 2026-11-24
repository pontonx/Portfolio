# Kacper Glinka portfolio

## Local preview

```powershell
node build.mjs
py -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open [the local preview](http://127.0.0.1:4173/). Use Ctrl+C in the terminal to stop the server.

## GitHub Pages

GitHub Pages publishes the root of `main` to `kacperglinka.com`. After changing the source, regenerate the published pages and then commit and push the changes to `main` in GitHub Desktop.

```powershell
node build.mjs --publish
```

Edit `portfolio.mjs` for content, `index.template.html` for the shared page and `style.css` for styling. See [MIGRATION.md](MIGRATION.md) for the project inventory and sources.
