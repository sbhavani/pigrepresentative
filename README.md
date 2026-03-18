# PigRepresentative

A curated directory of devices that can run [OpenClaw](https://github.com/openclaw/openclaw) — from home servers to portable companions.

## What is PigRepresentative?

PigRepresentative catalogs various writing devices and evaluates their suitability for running OpenClaw, your personal AI agent. Whether you want a always-on home server or a portable device for on-the-go agent interaction, this guide helps you find the right hardware.

## OpenClaw Compatibility Ratings

| Rating | Description |
|--------|-------------|
| 🟢 **Excellent** | Native support, runs great |
| 🔵 **Good** | Works with some limitations |
| 🟡 **Limited** | Can run some things, but not full OpenClaw |
| 🔴 **Not Supported** | Cannot run OpenClaw |

## Recommended Devices

### For Home Server / Always-On
- **Apple Mac Mini** — The ultimate OpenClaw home server. Powerful, silent, 24/7 capable.
- **Intel/ASUS NUC** — Compact x86 mini PC with full Linux support.
- **Raspberry Pi 5** — Affordable option for lightweight deployments.

### For Portability
- **MacBook Air** — Excellent battery life, lid-closed mode works great.
- **Framework Laptop** — Modular, repairable, full Linux support.
- **Valve Steam Deck** — Fun handheld form factor, runs Linux.

### For Writing Only (Not for OpenClaw)
- Astrohaus Freewrite / Alpha — Great writers but locked-down OS.
- reMarkable — E-ink tablet, cannot run custom software.
- Alphasmart Neo — Vintage budget writerdeck.

## Tech Stack

- [Next.js 15](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) components
- [Radix UI](https://www.radix-ui.com/) primitives

## Getting Started

```bash
# Clone the repo
git clone https://github.com/sbhavani/pigrepresentative.git
cd pigrepresentative

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit http://localhost:3000

## Building for Production

```bash
npm run build
```

The build output is in the `out` directory.

## Deployment

### Cloudflare Pages (Recommended)
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages
2. Connect to GitHub and select this repo
3. Configure:
   - Build command: `npm run build`
   - Build output directory: `out`
4. Deploy!

### Vercel
```bash
npm i -g vercel
vercel --prod
```

### Netlify
1. Go to [Netlify](https://app.netlify.com)
2. Import from GitHub
3. Auto-detects Next.js

## Contributing

To add or correct a device, edit `src/app/page.tsx` and update the `devices` array.

## License

MIT — See [LICENSE](LICENSE) for details.

## Acknowledgments

Inspired by [openhardware.directory](https://openhardware.directory).
