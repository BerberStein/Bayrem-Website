# Bayrem Ben Rayen, Personal Website

Static site (no build step); plain HTML/CSS/JS. Terminal / AIOps-dashboard aesthetic.

## Structure
```
index.html          all page content/sections
style.css            all styling (design tokens at the top)
script.js             typing effect, uptime ticker, sparkline, mobile menu
assets/Bayrem_Ben_Rayen_Resume.pdf   downloadable résumé (linked from the nav + hero)
```

## Editing content
- **Text**: edit directly in `index.html`; sections are labeled with HTML comments (`<!-- ============ HERO ============ -->` etc).
- **Blog posts**: the `#blog` section has two placeholder cards marked `draft`. Replace the title/excerpt, or turn `.blog-link` into a real `<a href="...">` once you have posts to link to (e.g. individual `.html` files in a `/blog` folder, or a Markdown-based static blog if you want to grow this later).
- **Résumé**: replace `assets/Bayrem_Ben_Rayen_Resume.pdf` with an updated export any time; the filename is already wired up in both the nav and hero buttons.
- **Colors/fonts**: all design tokens (`--bg`, `--accent`, `--font-mono`, etc.) are declared at the top of `style.css` under `:root`.

## Deploying

### GitHub
```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/BerberStein/<repo-name>.git
git push -u origin main
```

### Vercel
1. Go to vercel.com → **Add New... → Project**
2. Import the GitHub repo you just pushed
3. Framework preset: **Other** (no build step needed; it's static)
4. Deploy. Vercel gives you a `*.vercel.app` URL immediately; add a custom domain later if you want one.

No environment variables, no build command, no backend; it's just static files.
