# Strike First 🥊

> Strike Hard. No Mercy.

A highly responsive, mobile-first 5-day boxing power & conditioning web application. Built entirely with Vanilla web technologies to ensure maximum performance, zero build steps, and native-app feel on both iOS and Android.

🔗 **Live app:** [https://elangbamjohnson.github.io/Workout/](https://elangbamjohnson.github.io/Workout/)

---

## 🛠 Handout for New Developers

Welcome to the project! This document serves as your map to the codebase. The app is intentionally built without frameworks (React, Vue, etc.) to keep it blazing fast and easily maintainable. 

### Architecture Overview
The application is a Single Page Application (SPA) where the entire UI is dynamically injected into `#app-container` in `index.html`. State is persisted natively in the browser's `localStorage`.

### 1. The Core Files

- **`index.html`**: The main app shell. Contains the splash screen, the global navigation header wrapper, and the empty `#app-container`. External stylesheets are loaded at the bottom of the `<body>` to prevent render-blocking the splash screen.
- **`styles.css`**: All styling. Uses heavily customized CSS Variables (`:root`) for theming, typography, and spacing. It utilizes a mobile-first media query approach (`@media (min-width: 768px)`).
- **`app.js`**: The UI engine. It handles "routing" via functions like `renderHome()` and `renderDay(dayId)`. It injects HTML template literals directly into the DOM. It also manages the video modal logic and global header state.
- **`data.js`**: The single source of truth for all workout content. It attaches `window.workoutData` to the global scope. If you need to change a workout, fix a typo, or add a YouTube video ID, do it here.
- **`timer.js`**: Handles the complex logic for workout timers. It manages `setInterval` loops, integrates with the `window.speechSynthesis` API for audio coaching, and acquires the `window.WakeLock` API to ensure the user's phone screen doesn't turn off mid-workout.
- **`store.js`**: The database layer. A lightweight wrapper around `localStorage` that manages user progress, training streaks, completed sessions, and weight tracking.
- **`sw.js` & `manifest.json`**: The Progressive Web App (PWA) infrastructure. This allows the app to be installed to the home screen and function completely offline by caching assets.

### 2. The Data Structure (`data.js`)
Understanding `data.js` is critical. The main object is structured as follows:
```javascript
{
  days: [
    {
      id: 1, // or '6-7'
      type: 'strength', // 'strength' | 'bag' | 'technical' | 'rest'
      title: 'Explosive Power',
      warmup: [ { name, duration, cue, type, switchSides } ],
      exercises: [ // Used for strength/bag days
        { name, sets, reps, videoId, callout }
      ],
      sections: [ // Used for technical days
        { title, description, duration }
      ]
    }
  ]
}
```

### 3. Cross-Platform UI Guidelines
When developing, fixing, or extending UI/UX elements, you **MUST always consider cross-platform compatibility (iOS Safari, Android Chrome, and Desktop Web)**. 
- *Example:* CSS `:active` states for buttons are disabled by default on iOS Safari touch screens. We fix this by attaching a passive `touchstart` listener to the document body in `app.js`.
- Always use `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)` in CSS when positioning fixed elements to prevent overlapping with iPhone notches, Dynamic Islands, and home bars.
- Modals (like the video player or timers) must have a `z-index` of `100000` or higher to cover the fixed global navigation bar.

### 4. PWA & Offline Support
If you add new assets (images, fonts, scripts), you **must** update the `CACHE_NAME` in `sw.js` (e.g., `strikefirst-v2`) to force the service worker to fetch the latest files and update the user's offline cache.

---

## 🚀 Local Development

There is absolutely no build step, no Webpack, and no `node_modules` required. 

1. Clone the repository.
2. Open the folder in your terminal.
3. Start a local static server:
   ```bash
   npx serve .
   # or
   python3 -m http.server 8080
   ```
4. Open your browser to the localhost URL.

## 📝 License

Free to use for personal training. Built by Johnson Elangbam.
