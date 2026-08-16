# Agent Rules — Strike First Project

These rules apply to any AI coding agent (Cursor, Antigravity, Windsurf, Copilot, etc.)
working in this repository. Read this file in full before making any changes.
If a user prompt conflicts with a rule here, follow the prompt for that task only —
these rules resume immediately after.

---

## 1. Role & Mindset

- Act as a senior, experienced web developer. Prioritize correctness, minimal footprint,
  and maintainability over cleverness or speed.
- Do not guess at requirements. If a prompt is ambiguous or missing detail needed to
  implement it safely, ask a clarifying question before writing code — do not assume
  and proceed.
- Do not introduce new frameworks, libraries, build tools, or dependencies unless the
  prompt explicitly asks for them. This project is intentionally vanilla HTML/CSS/JS
  with no build step and no framework — keep it that way.

## 2. Version Control — Hard Rules

- **Never push directly to `main`.** All work happens on a feature branch.
- **Never open a Pull Request automatically.** Prepare the branch and changes, then stop
  and report back — the human decides when and whether to open a PR.
- **Never merge a branch automatically**, even if tests pass.
- Create one branch per **feature**, not per task/prompt. All prompts, fixes, and
  iterations belonging to the same feature stay on that same feature branch
  (e.g. everything for Quick Sessions — Phase 1, Phase 2, and any bug fixes like the
  Shadow Boxing timer fix — happens on a single `feature/quick-sessions` branch).
  Only start a new branch when starting a genuinely new, separate feature.
- Do not delete branches, tags, or force-push under any circumstance without being
  explicitly told to.
- Commit messages should be clear and scoped to what actually changed — no vague
  messages like "updates" or "fixes."

## 3. Scope Discipline

- Only touch the files necessary for the current task. Do not "clean up" unrelated code,
  rename variables, reformat untouched files, or refactor adjacent logic unless asked.
- If completing the task properly requires touching a file outside the stated scope,
  stop and flag it instead of silently expanding scope.
- Do not delete existing features, data, or files unless explicitly instructed.
- Preserve existing naming conventions, code style, and file structure patterns already
  established in the codebase — match what's there, don't impose new patterns.

## 4. Project-Specific Constraints (Strike First)

- No build step, no bundler, no npm dependencies for the app itself — plain JS/HTML/CSS only.
- Reuse existing shared logic (e.g. `renderDay()`, `timer.js`, `store.js` patterns) instead
  of duplicating similar logic in a new function. If two things behave the same way, they
  should share the same code path.
- Match existing data shapes exactly (e.g. how `workoutData` / `quickWorkouts` entries are
  structured) — don't invent new field names or a parallel structure for new data unless
  necessary, and flag it if you do.
- Any time new assets, markup, or data are added that affect what's cached offline, bump
  `CACHE_NAME` in `sw.js`.
- Don't add new colors/theme values — reuse the existing dark theme / accent color system.

## 5. Before Making Changes

- Read every file relevant to the task first, not just the file you expect to edit —
  understand how existing patterns work before extending them.
- If existing code already solves a similar problem (e.g. an existing timer pattern, an
  existing modal/banner pattern), reuse or extend it rather than building a parallel
  implementation.

## 6. After Making Changes

- Do not mark a task complete without verifying it against the test checklist provided
  in the prompt (or reporting explicitly if no checklist was given).
- Report back clearly: what changed, which files were touched, and a checklist of what
  was tested vs. what still needs manual verification by the human.
- Flag any deviation from the prompt's instructions — do not silently implement something
  differently than asked, even if you think your way is better. Explain the concern and
  ask, or implement as asked and note your concern separately.

## 7. Safety & Data

- Never commit secrets, API keys, or credentials, even temporarily.
- Never run destructive commands (`rm -rf`, force-push, database drops, etc.) without
  explicit, direct instruction for that specific action.
- Do not modify `.git` history, rebase, or squash commits unless explicitly asked.

## 8. Communication Style

- Be concise and direct in status reports — no filler, no restating the entire prompt
  back before acting.
- If something in the prompt seems like it will break existing functionality, say so
  before proceeding, don't discover it silently mid-implementation and route around it
  without mentioning it.

## 9. Lessons Learned & Error Prevention

- **HTML Injection in Attributes:** Never pass raw, unencoded strings containing HTML or double quotes directly into HTML attributes (e.g., `onclick="..."`). This breaks the DOM parser and causes layout warping. Always use `encodeURIComponent()` to safely pass complex string data.
- **Decoupling UI from Logic:** Do not overload a single data field (e.g., `combo`) to act as both a massive block of UI HTML and an array for programmatic logic (like `timer.js` splitting by `<br>` for `uiIndex` highlighting). If the UI needs detailed, formatted text, separate it into a strictly visual field (e.g., `description`), leaving the original field clean for the system logic to consume perfectly.
- **Exact Audio/Timer Script Adherence:** When provided with precise audio prompt scripts and timestamps (e.g., "0:00 Session start" vs "5 sec Pre-Tabata countdown"), follow the timeline exactly. Do not artificially infer or inject countdowns or phases that the user did not explicitly request.
- **Safe Array/Data Manipulation:** When updating massive arrays or JSON objects in files like `data.js`, do not use crude substring or regex replacements that risk corrupting Javascript syntax (e.g., leaving dangling brackets like `} ]}`). Verify data structure integrity using `node -c <filename>` before asserting the task is complete.
- **Deep Component Lifecycle Knowledge:** Before modifying shared engine code (like `timer.js`), rigorously evaluate how the change affects the full lifecycle. For example, injecting `this.close()` to stop a single phase can inadvertently destroy an entire continuous playlist sequence. Trace the execution path thoroughly.