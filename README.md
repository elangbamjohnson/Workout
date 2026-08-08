# Strike First 🥊

> Strike Hard. No Mercy.

A free 5-day boxing power & conditioning web app — no download, no
subscription, works on any device.

🔗 **Live app:** https://elangbamjohnson.github.io/Workout/

---

## Features

- 5-day structured boxing program (strength, bag work, technical skills)
- Built-in round and rest timers for every exercise
- Audio coaching prompts — hands-free training
- Video demo for every exercise
- Structured warm-up for every session
- Progress tracking and training streak
- Works offline (PWA)
- Installable on iPhone and Android

## Install on iPhone

1. Open the link in **Safari**
2. Tap the Share button → **Add to Home Screen**
3. Tap **Add** — done!

## Tech Stack

- Plain HTML / CSS / JavaScript (no framework)
- Web Speech API (audio coaching)
- YouTube iframe embeds (video demos)
- localStorage (progress persistence)
- Service Worker (offline/PWA)
- Screen Wake Lock API (screen stays on during timers)

## Project Structure

```
├── index.html       # Main app shell
├── app.js           # All app logic
├── styles.css       # Styles
├── data.js          # Full workout program data
├── sw.js            # Service worker
├── manifest.json    # PWA manifest
├── offline.html     # Offline fallback
└── assets/          # Icons and images
```

## Local Development

No build step required. Just open `index.html` in a browser, or run
a local server:

```bash
npx serve .
# or
python3 -m http.server 8080
```

## License

Free to use for personal training. Built by Johnson Elangbam.
