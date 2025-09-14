<div align="center">
<h1>🌈💻 Modernized Colors.sh</h1>
</div>

> [!NOTE]
> **This is a modern fork of the original [colors.sh](https://github.com/messutied/colors.sh) project.**
> It fixes bugs, modernizes the website and codebase, and adds new features and improvements while preserving the original _look & feel_ and functionality.

## About
Colors.sh helps you add colors and formatting to your bash scripts in a visual way, it looks like this:
![Preview](/public/full_preview.png)

<div align="center">
Go to <a href="https://colors-sh.pages.dev">https://colors-sh.pages.dev</a> to try it out now!
</div>

---

## What's New in This Fork?

### 🚀 Modernization & Improvements

- **Migrated build system from Webpack to Vite** for faster, simpler, and more reliable development and production builds
- **Moved static assets** from `/www` to `/public`
- **Updated project structure and scripts** for Vite compatibility
- **Removed legacy unused config/scripts**
- **Modernized the codebase** to use latest React and MobX patterns
- **Added a modern dark/light mode switcher** with system theme detection and persistence
- **Improved theme switching**
- **Navbar redesigned**
- **Terminal preview is now visually independent** from global site theme (follows its own "Terminal theme" selector)
- **All color pickers and preview elements** now smoothly transition colors on theme change
- **Improved accessibility and responsiveness** of UI components

### 🐛 Bug Fixes

- Fixed: color chooser and terminal preview not updating correctly with theme or color changes
- Fixed: output preview not updating when preview text changes
- Fixed: terminal header buttons not showing in both light and dark terminal themes
- Fixed: color transitions for all relevant UI elements
- Fixed: site to respect system theme preference

---

## Development Setup

> [!TIP]
> You can use either `npm` or `yarn` for development. The examples below use `npm`.

Download the repository:

```bash
git clone https://github.com/4ngel2769/colors.sh && cd colors.sh
```

Run the following commands under the project root folder:

```bash
npm install
npm run dev # to launch the development server.
```

---

## Production

Build the production ready bundle by running

```
npm run build
```

The production bundle will be generated under the `/dist` folder.

### Run production bundle in local machine

```
npm run start
```

---

## Deployment

> [!IMPORTANT]
> This fork is designed for **Cloudflare Pages**.  
> You must first set up Cloudflare Pages with this repository.  
> Once set up, just push to your main branch and Cloudflare will build and deploy automatically from the `dist` folder.

---

## Credits

**Original Colors.sh:**
- [Eduardo Messuti](https://github.com/messutied/colors.sh) - MIT License

**Modern Fork & Upgrades:**
- [4ngel2769](https://github.com/4ngel2769/colors.sh)
