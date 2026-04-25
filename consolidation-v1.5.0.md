# Consolidation v1.5.0 — Code Audit & Refactor Plan

Audit of `@keenmate/svelte-switch` performed on 2026-04-24 against the main branch at commit `88325be`. Focus: code unification, dead code removal, Svelte 5 idiom alignment, and API consistency.

---

## Progress tracker

### Critical
- [x] **C1** — Collapse MultiSwitch label template duplication — *320-line label block → ~70-line snippet-based dispatch; net −140 lines in the component*
- [x] **C2** — Fix / delete `test-update.html` (uses Svelte 4 API + renamed `stepsCount`) — *deleted*
- [ ] **C3** — Include `labelTemplate` (and other snippets) in `MultiSwitch.update()` OR delete `update()` entirely
- [ ] **C4** — Replace `update()` anti-pattern with a reactive-state idiom (or drop it)
- [x] **C5** — Delete stale `src/lib/assets/main.css`
- [x] **C6** — Fix `effectiveStepsCount` stale comment / `itemsCount` behavior — *items.length wins when provided, itemsCount is fallback; comment accurate*
- [x] **C7** — Fix `currentStepContext` passing `itemsCount` instead of `effectiveStepsCount`
- [x] **C8** — Migrate `+layout.svelte` from deprecated `$app/stores` → `$app/state`

### Design / structural
- [ ] **D9** — Make components generic over item type `<T>` instead of `any[]`
- [x] **D10** — Type `Switch.items` as tuple `[T, T]` (remove runtime warn) — *done with D21; `readonly [unknown, unknown] | null`; generics pass (D9) will swap unknown→T*
- [x] **D11** — Extract `getStyleForIndex` + label-text resolver + `itemAt` into `src/lib/utils.ts` — *also exported `ItemStyles` type alias*
- [ ] **D12** — Unify `isSelected` semantics across Switch / MultiSwitch snippet contexts
- [ ] **D13** — Unify snippet context shape (`item` vs `currentItem`, drop inconsistent fields)
- [ ] **D14** — Split `children` into `thumb` vs `segment` snippets (or restrict `children` to one role)
- [ ] **D15** — Remove / rename `disableThumbRender` after D14
- [x] **D16** — Fix click-to-select hit-testing (respect margins + step-spacing) — *extracted `hitTestStep()` using proper stride; constants mirror main.scss*
- [ ] **D17** — Replace `style:--x={... || ""}` with `... ?? null`
- [x] **D18** — Tighten SCSS `:has()` selectors so future label combos don't silently break — *labels-container top/bottom now covered by column-direction rule*
- [x] **D19** — Replace clickable `<div class="label">` with `<button>` — *keyboard activation free, all `svelte-ignore a11y_*` on labels dropped, disabled state via button's `:disabled`*
- [x] **D20** — Make `aria-valuemin/max/now` typing consistent — *side effect of C1 template rewrite; all three now numeric*
- [x] **D21** — Replace `$effect(console.warn)` on items length with type-level constraint

### Parity with `svelte-treeview` (sibling project)
- [x] **T33** — Add `vite.config.ts` `define:` block for `__VERSION__` / `__PACKAGE_NAME__` / `__HOMEPAGE__` — *also added `__REPOSITORY__`; declarations in `app.d.ts`*
- [x] **T34** — Restructure dev routes as card-grid landing + per-topic sub-routes — *`/dev` is a card grid; `/dev/binary`, `/dev/multi`, `/dev/labels`, `/dev/styled`*
- [x] **T35** — Extract shared `DevHeader.svelte` (back-link + title + controls) for reuse across dev routes
- [x] **T36** — Fold `test-label-modes.html` into a proper `/dev/labels` route (kill the orphan HTML file)
- [x] **T37** — Add `.editorconfig`, `.prettierrc`, `.prettierignore`, `eslint.config.js` matching treeview's setup (supersedes P23) — *installed prettier, eslint 9 flat config, eslint-plugin-svelte 3, typescript-eslint 8, prettier-plugin-svelte; reformat landed as separate commit*
- [x] **T38** — Add `sideEffects: ["**/*.css", "**/*.scss"]` to `package.json` for tree-shaking
- [x] **T39** — Add `vitest` with unit tests — *15 tests covering `getStyleForIndex`, `itemAt`, `resolveLabelText`; `npm test` / `npm run test:run` scripts; click hit-test still inline in MultiSwitch (extract deferred to a future pass)*
- [x] **T40** — Pin a unique dev port — *17778 (adjacent to treeview's 17777)*
- [x] **T41** — Add `prerender.handleHttpError: 'warn'` + `handleMissingId: 'warn'` to `svelte.config.js`
- [x] **T42** — Include `CHANGELOG.md` in the `files` array of `package.json` (so it ships with the package)

### Polish
- [x] **P22** — Drop hardcoded `v1.3.0` in homepage — *version display removed; importing `package.json` is blocked by Vite's `server.fs.allow`, and adding the version via `vite.config.ts` define was more config than the demo header warrants*
- [x] **P23** — Add `.editorconfig` + `.prettierrc` to enforce indent style — *done via T37*
- [x] **P24** — Extract repeated `items ? items[i] : undefined` pattern — *replaced with `itemAt(items, i)` helper*
- [x] **P25** — Hoist `import type { Snippet } from 'svelte'` once per file
- [ ] **P26** — Replace `transition: all` with pinned properties
- [x] **P27** — Unify `items && items[i]` vs `items ? items[i] : undefined` — *replaced with `items?.[i]` during C1 collapse*
- [ ] **P28** — Clean up dead/redundant `$derived` values in Switch
- [ ] **P29** — Extract `$label-gap: 10px` SCSS variable
- [ ] **P30** — Scope root-level `.thumb` selector under its component
- [ ] **P31** — Expose focus styling as CSS custom properties (theming prep)
- [ ] **P32** — Move items-length validation out of `$effect`

---

## Critical issues (detail)

### C1. `MultiSwitch.svelte` — massive template duplication
Lines 175–487 contain **seven near-identical blocks** for rendering labels:
- before-switch (block mode): `{vertical+left}`, `{horizontal+top/left}`, `{vertical+top}`
- absolute mode: `{vertical+left/right}`, `{vertical+top/bottom}`, `{horizontal+any}`
- after-switch (block mode): `{vertical+right}`, `{horizontal+bottom/right}`, `{vertical+bottom}`

Each block repeats the same `{#if labelTemplate}…{:else}<span class="default-label">…`, the same `onclick={() => { if (!isDisabled && !thumbTemplate) selectStep(index); }}`, the same `<div class="label" class:active class:clickable>`, and the same `svelte-ignore` comments.

**Target:** collapse to two branches — a "single-label" block and a "per-step labels" block — plus a derived `labelsGoBefore` boolean and a derived position-class string. Extract a `<Label />` helper snippet or component.

### C2. `test-update.html` is stale / broken
- Uses Svelte 4 instantiation (`new MultiSwitch({ target, props })`) — Svelte 5 requires `mount()` from `svelte`.
- Uses `stepsCount: 4` / `stepsCount: 5` — that prop was renamed to `itemsCount`.

**Target:** rewrite with `mount()` + `itemsCount`, or delete since `test-label-modes.html` already covers similar ground.

### C3. `labelTemplate` missing from `MultiSwitch.update()`
`update()` syncs every prop **except** `labelTemplate`, `children`, `thumbTemplate`. Vanilla-JS consumers can't swap the label template after mount.

### C4. `update()` itself is an anti-pattern in Svelte 5
Svelte 5 props are reactive. A 20-line `if (updates.X !== undefined) X = updates.X` means every new prop needs edits in **three places** (`Props` interface, destructure, `update()`). C3 is the natural consequence.

**Target:** either
- remove `update()` entirely and document `mount()` usage for vanilla JS, or
- make it generic: `Object.assign(state, updates)` against a single `$state`-backed object.

### C5. `src/lib/assets/main.css` is stale
138 lines of `main.css` vs 399 lines of `main.scss`. The `.css` predates the label system, block mode, container classes, `thumbBorderColor` rename. Not imported anywhere. **Target:** delete.

### C6. `effectiveStepsCount` comment lies
```ts
// Use items.length if stepsCount not explicitly provided and items exists
const effectiveStepsCount = $derived.by(() => {
  if (items && items.length > 0) return items.length;
  return itemsCount;
});
```
Comment says "if stepsCount not explicitly provided" but the code **always** uses `items.length` when items exist, regardless of `itemsCount`. Comment also still uses the old `stepsCount` name.

**Target:** decide the contract (items wins OR itemsCount wins when both present), update code + comment + CLAUDE.md.

### C7. `currentStepContext` bug
```ts
let currentStepContext = $derived({ currentIndex, currentItem, itemsCount });
```
When a consumer passes `items={[...5 items]}` without setting `itemsCount`, the thumb template receives `itemsCount: 3` (default) while the switch renders 5 segments. Should use `effectiveStepsCount`.

### C8. Deprecated `$app/stores`
`src/routes/+layout.svelte:2` — SvelteKit 2.22+ uses `$app/state`. Migrate `$page` → `page` (no `$` prefix).

---

## Design / structural issues (detail)

### D9. `items: any[] | null` — generics never used
Both components take `items: any[] | null`. Should be generic `items?: readonly T[] | null`, `item: T`. All snippet signatures thread through.

### D10. `Switch.items` tuple
`items?.length !== 2` is enforced via runtime `console.warn`. Compile-time: `items?: [T, T] | null`. Eliminates C21.

### D11. Shared helpers
- `getStyleForIndex` lives identically in both files.
- Label-text resolver (`labelMember` / `labelCallback` / fallback) is MultiSwitch-only today but belongs with item helpers.
- `itemAt(i)` wrapper.

Move to `src/lib/utils.ts`.

### D12. `isSelected` semantics diverge
- `Switch` children: `isSelected: checked`.
- `MultiSwitch` thumb children: hardcoded `isSelected: true`.
- `MultiSwitch` step-segment children: `isSelected: index === selectedIndex`.

Consumer snippets can't be shared. Pick one meaning.

### D13. Snippet shape inconsistent
- `children` → `{ currentIndex, item, isSelected }`
- `thumbTemplate` → `{ currentIndex, currentItem, itemsCount }`
- `labelTemplate` → `{ currentIndex, item, isSelected }`

`item` vs `currentItem` for the same thing. Unify on `item` + consistent base context.

### D14. `children` rendered in two places with different contracts
In MultiSwitch, `children` fires inside `.thumb` (as the moving thumb) AND once per `.step-segment` (as background content). Two roles, one snippet. Split into `thumbTemplate` (exists) + `segmentTemplate`, OR restrict `children` to thumb-only.

### D15. `disableThumbRender` confused flag
Suppresses `children` in the thumb but not `thumbTemplate`. Becomes redundant once D14 lands.

### D16. Click hit-testing ignores margins / spacing
```ts
const step = Math.floor(pos * effectiveStepsCount);
```
Treats the switch as `1/N` per step, ignoring `--margin` and `--step-spacing`. Clicks near boundaries land one step off at small sizes. Use `getBoundingClientRect()` on each segment, or solve with proper margin-aware math.

### D17. `style:--x={... || ""}` fragility
Works only because CSS treats empty string as "invalid" and falls back via `var(--x, default)`. Svelte idiom: `style:--x={value ?? null}` (Svelte skips `null`).

### D18. SCSS `:has()` selectors incomplete
```scss
&:has(.label-single.label-position-top),
&:has(.label-single.label-position-bottom) { flex-direction: column; }
```
Doesn't cover `.labels-container.label-position-top/bottom`. Currently masked because that combination doesn't exist, but coupling CSS layout to the absence of a feature is a landmine.

### D19. Accessibility papered over
Every interactive `<div>` carries `<!-- svelte-ignore a11y_click_events_have_key_events -->` + `a11y_no_static_element_interactions`. Replace label `<div>`s with `<button>` — keyboard support free.

### D20. Inconsistent ARIA typing
`aria-valuemin="0"` (string) vs `aria-valuemax={effectiveStepsCount - 1}` (number). Pick one.

### D21. `$effect(console.warn)` on items length
Fires on every `items` change, not dev-gated, not deduped. D10 eliminates the need.

---

## Polish (detail)

### P22. Hardcoded `v1.3.0`
`src/routes/+page.svelte:18` says v1.3.0; `package.json` says 1.4.0. Import from `package.json` or drop.

### P23. No `.editorconfig` / `.prettierrc`
Switch/MultiSwitch use 2 spaces; package.json/routes use tabs. `prettier --check` passes because… there's no config. Add one.

### P24. Repeated `items ? items[i] : undefined`
Appears ~10 times. Extract `itemAt(i)` (see D11).

### P25. Inline `import("svelte").Snippet<…>`
Hoist: `import type { Snippet } from 'svelte';`.

### P26. `transition: all`
Pin the animated properties (`opacity`, `color`, `transform`).

### P27. `items && items[i]` vs `items ? items[i] : undefined`
Both patterns appear. Use `items?.[i]` everywhere.

### P28. Redundant `$derived` in Switch
`currentStepContext` holds `itemsCount: 2` for a binary switch — concept doesn't apply. Remove or rename.

### P29. Magic `10px * var(--scale)`
Repeated six times in `main.scss`. Extract `$label-gap: 10px`.

### P30. Unscoped `.thumb` selector
`.thumb { ... }` at top-level emits into both components' bundles. Scope under `.switch .thumb`.

---

## Parity with `svelte-treeview` (detail)

Based on a review of the sibling `../svelte-treeview` project on 2026-04-24. That project is further along and demonstrates several patterns worth borrowing.

### T33. `vite.config.ts` `define:` block for package metadata
```ts
import pkg from './package.json' with { type: 'json' };

export default defineConfig({
  plugins: [sveltekit()],
  define: {
    '__VERSION__': JSON.stringify(pkg.version),
    '__PACKAGE_NAME__': JSON.stringify(pkg.name),
    '__HOMEPAGE__': JSON.stringify(pkg.homepage || '')
  }
});
```
Exposes build-time constants without hitting Vite's `server.fs.allow` (the issue that broke P22). Also needs matching `declare const __VERSION__: string;` etc. in `src/app.d.ts`.

### T34. Per-topic dev routes with card-grid landing
Treeview's `src/routes/examples/` has `basic/`, `drag-drop/`, `theming/`, `search/` etc. each as a `+page.svelte` route, with the root `+page.svelte` rendering a card grid of links. Much better UX than one long dev page.

Scope here (smaller, since showcase lives in `svelte-switch-showcase`): one card grid for `/dev/` with sub-routes for the scenarios worth exercising locally — binary, multi, labels, sizes, vertical, itemStyles.

### T35. Shared `DevHeader.svelte`
Treeview has `ExampleHeader.svelte` with `{ title, subtitle, showRenderModeSwitch }` reused across every example route. Apply the same here to give dev sub-routes a consistent "back to dev index" link + title.

### T36. Fold `test-label-modes.html` into a real route
The orphan HTML file at project root is unreachable from the nav, won't work after `npm run build` (references `./dist/switch.css` which `svelte-package` doesn't emit), and duplicates what a dev route should do. Turn it into `/dev/label-modes` and delete the HTML.

### T37. Tooling parity
Treeview ships:
- `.editorconfig` (indent_size, charset, end_of_line consistency)
- `.prettierrc` + `.prettierignore`
- `eslint.config.js` using flat config, with `eslint-plugin-svelte`, `typescript-eslint`, `eslint-config-prettier`
- `@eslint/compat`, `@eslint/js`, `globals`

Switch's `package.json` scripts `lint: "prettier --check . && eslint ."` but none of these configs exist. Either add them or remove the scripts. Supersedes P23.

### T38. `sideEffects` in `package.json`
Treeview declares `"sideEffects": ["**/*.css", "**/*.scss"]` so bundlers can tree-shake unused JS exports while preserving style imports. Free win for consumers.

### T39. Unit tests with `vitest`
No tests exist today. Once D11 extracts `getStyleForIndex`, label-text resolver, and click hit-test math into pure functions, they're trivially testable. Treeview uses vitest + `test` / `test:run` scripts.

### T40. Dev port
Treeview pins `vite dev --port 17777`. Switch inherits Vite's default 5173, which collides with any other Vite project the user runs. Pick an unused port in the 17xxx range.

### T41. Prerender error handling
Treeview's `svelte.config.js` sets `prerender.handleHttpError: 'warn'` and `handleMissingId: 'warn'` so broken demo links warn instead of failing the build.

### T42. `CHANGELOG.md` in package `files`
Treeview ships the changelog to npm consumers. Switch's `files: ["dist", ...]` currently excludes it.

### P31. Focus styling as CSS custom properties
`$focus-color` / `$focus-shadow` are Sass-only. Expose as CSS custom properties for theming.

### P32. `$effect` used for validation only
`src/lib/Switch.svelte:56–62` — Svelte 5 explicitly discourages `$effect` for pure side effects that aren't syncing to external systems.

---

## Suggested execution order

Each group is a natural commit boundary.

1. **Hygiene pass (safe):** C2, C5, C8, P22 — delete stale files, fix stale references. *(done)*
2. **Tooling & project structure parity:** T37, T38, T40, T41, T42, T33 — non-invasive infra that unblocks later work (editorconfig first, so formatting changes don't pollute diffs of subsequent groups).
3. **Silent bug fixes:** C6, C7, D16, D21 — correctness.
4. **Dev route restructure:** T34, T35, T36 — one-time reorg, easier to land before D-group API changes make dev-page updates churn.
5. **MultiSwitch template collapse:** C1, D18, D19 — biggest readability win.
6. **Shared helpers + naming + tests:** D11, D13, D12, P24, P25, P27, T39 — internal consistency, tests land with the helpers they cover.
7. **API shape cleanup:** D9, D10, D14, D15, D17, D20 — **breaking changes**, bundle for 1.5.0.
8. **`update()` decision:** C3, C4 — pick one direction after API shape settles.
9. **Style polish:** P26, P28, P29, P30, P31, P32.

Groups 1–6 are non-breaking (or internal-only) and can land incrementally. Group 7 is the actual 1.5.0 breaking bump; needs CHANGELOG + README updates.
