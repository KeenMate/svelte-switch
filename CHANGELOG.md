# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-04-25

Major release. Public snippet API reshaped for consistency, generics added, vanilla-JS `update()` escape hatch removed in favor of Svelte 5's reactive props, full theming layer added (cross-library `--base-*` + per-instance `--sw-*`), `window.components` global API, categorized logger, interactive playground.

Existing consumers using `<Switch bind:checked>` / `<MultiSwitch bind:selectedIndex>` without snippets are unaffected by the API rewrite. Snippet authors and `update()` consumers need to migrate (table below).

### 💥 Breaking Changes

#### Snippet API renamed and split

| 1.x | 2.0 |
| --- | --- |
| `children` (`Switch`) | `thumb` |
| `children` (`MultiSwitch`, ran in BOTH the moving thumb AND each step background) | split into `thumb` (one render) + `segment` (one render per step) |
| `thumbTemplate` | merged into `thumb` |
| `labelTemplate` | `label` |

Snippet context is now consistent:

| 1.x | 2.0 |
| --- | --- |
| `currentIndex` | `index` |
| `currentItem` | `item` |
| `itemsCount` (in `thumbTemplate`) | dropped — read from props if needed |

`isSelected` semantics are unified: `Switch.thumb`, `MultiSwitch.segment`, and `MultiSwitch.label` all receive `isSelected: boolean`. `MultiSwitch.thumb` does NOT receive `isSelected` (it's always the selected position by definition).

**Migration:**

```svelte
<!-- 1.x -->
<Switch bind:checked>
  {#snippet children({ isSelected })}
    {isSelected ? '✓' : '✗'}
  {/snippet}
</Switch>

<!-- 2.0 -->
<Switch bind:checked>
  {#snippet thumb({ isSelected })}
    {isSelected ? '✓' : '✗'}
  {/snippet}
</Switch>
```

```svelte
<!-- 1.x — children rendered TWICE: once as thumb, once per step background -->
<MultiSwitch>
  {#snippet children({ currentIndex, isSelected })}
    <span>{isSelected ? '★' : '☆'}</span>
  {/snippet}
</MultiSwitch>

<!-- 2.0 — explicit split, each snippet has one job -->
<MultiSwitch>
  {#snippet thumb({ index })}
    <span>★ {index}</span>
  {/snippet}
  {#snippet segment({ index, isSelected })}
    <span>{isSelected ? '★' : '☆'}</span>
  {/snippet}
</MultiSwitch>
```

```svelte
<!-- 1.x -->
{#snippet labelTemplate({ currentIndex, item, isSelected })}…{/snippet}

<!-- 2.0 -->
{#snippet label({ index, item, isSelected })}…{/snippet}
```

#### `disableThumbRender` prop removed

In 1.x this was needed to suppress the `children` snippet when you wanted no thumb content but still wanted to pass it for segment rendering. With `thumb` and `segment` now distinct snippets, just don't pass `thumb`.

#### `Switch.items` is now a strict tuple

Already tightened in 1.4.x as `readonly [unknown, unknown] | null`. In 2.0 it becomes `readonly [T, T] | null` via the new generic.

#### Generic over item type `<T>`

Both components now accept a generic type parameter inferred from `items`:

```svelte
<MultiSwitch items={[{ id: 1 }, { id: 2 }]}>
  {#snippet label({ item })}
    {item.id} <!-- typed as { id: number } in 2.0; was `any` in 1.x -->
  {/snippet}
</MultiSwitch>
```

#### `update()` method removed

Both components shipped a `.update({...})` instance method intended for vanilla-JS consumers (Svelte 4 era). Svelte 5 props are reactive — set them on the props object you pass to `mount()` and they'll propagate. For vanilla JS:

```js
import { mount } from 'svelte';
import { Switch } from '@keenmate/svelte-switch';

const props = $state({ checked: false, size: 50 });
mount(Switch, { target: el, props });

// Later — just mutate the state object:
props.checked = true;
props.size = 80;
```

### 🐛 Fixed

- `MultiSwitch` thumb snippet context received the wrong step count when `items` and `itemsCount` were both passed (`itemsCount` won — should have matched `items.length`). Now uses `effectiveStepsCount`.
- `MultiSwitch` click-to-select hit-test ignored the 2px outer margin and 2px inter-step spacing — clicks near segment boundaries at small sizes / high step counts could land one step off. Replaced with margin-aware stride math.
- `MultiSwitch` per-step labels are now `<button>` elements with proper keyboard activation (Enter/Space) and `disabled` attribute, instead of `<div onclick>`.

### ✨ Added — Theming layer

#### `--base-*` cross-library cascade

Every color / radius / shadow / typography variable the library consumes resolves through `var(--base-*, fallback)`. Set a `--base-*` once on a parent (or `:root`), every nested switch picks up the theme — same convention as sibling KeenMate libraries (`@keenmate/web-multiselect`, `@keenmate/web-daterangepicker`).

The library reads:

| Variable | Drives |
| --- | --- |
| `--base-accent-color` | Focus ring + binary Switch on-state surface (via `--sw-bg-on`) |
| `--base-primary-bg` | Off / unselected switch surface |
| `--base-text-color-on-accent` | Thumb fill |
| `--base-border-color` | Default border color |
| `--base-text-color-1` / `--base-text-color-3` | Active / inactive label text |
| `--base-accent-color-light` / `--base-accent-color-light-hover` | MultiSwitch step segment surfaces (the "placeholder" boxes) |
| `--base-border-radius-sm` | Corner radius (unitless coefficient × `--sw-rem`) |
| `--base-shadow-sm` | Thumb drop shadow |
| `--base-font-family` / `--base-font-size-sm` | Label typography (font-size is a coefficient × `--sw-rem`) |

All compatible with `@keenmate/theme-designer` — themes generated there drop into svelte-switch with no per-component work.

#### `--sw-*` per-instance overrides

Component-level intermediate layer. Override one switch's thumb without affecting other KM components, or override one variable a theme didn't anticipate. Resolution order at every property: **`itemStyles` data** → **`--sw-*`** → **`--base-*`** → hardcoded fallback.

| Component variable | Default chain |
| --- | --- |
| `--sw-accent-color` | `--base-accent-color` |
| `--sw-bg-off` | `--base-primary-bg` |
| `--sw-bg-on` | `--base-accent-color` |
| `--sw-thumb-bg` | `--base-text-color-on-accent` |
| `--sw-thumb-border-color` | `transparent` |
| `--sw-step-bg` / `--sw-step-bg-active` | `--base-accent-color-light` / `-light-hover` |
| `--sw-label-color` / `--sw-label-active-color` | `--base-text-color-3` / `-1` |
| `--sw-label-hover-bg` / `--sw-label-hover-bg-active` | hardcoded light-theme tints |
| `--sw-focus-color` / `--sw-focus-ring` | `--base-accent-color` |
| `--sw-rem` | `10px` literal — multiplier for coefficient-based sizes; set to `1rem` for pure-admin |
| `--sw-border-radius` / `--sw-shadow` | `--base-border-radius-sm` (coefficient × `--sw-rem`) / `--base-shadow-sm` |

`component-variables.manifest.json` at the package root catalogs every variable with category and usage — same schema as the sibling KeenMate libraries.

#### Binary Switch flips to accent on-state

Off surface = `--sw-bg-off`, on surface = `--sw-bg-on` (defaulting to accent). Standard iOS / Material toggle behavior. 1.x stayed gray in both states, with only the thumb position signaling on/off.

### ✨ Added — `window.components['svelte-switch']` global API

Importing the library registers a global API matching the convention used by other KeenMate libs:

```js
window.components['svelte-switch'].version();           // '2.0.0'
window.components['svelte-switch'].config;              // package metadata
window.components['svelte-switch'].getInstances();     // HTMLElement[] of mounted roots
window.components['svelte-switch'].logging.enableLogging();
window.components['svelte-switch'].logging.setLogLevel('debug');
window.components['svelte-switch'].logging.setCategoryLevel('SWITCH:INTERACTION', 'trace');
```

`register()` (used by the sibling libs to define their custom element) is intentionally absent — svelte-switch ships Svelte components, not custom elements, so there's nothing to register.

### ✨ Added — Categorized logging

Vendored `loglevel` + `loglevel-plugin-prefix`, mirroring the sister libraries. Three categories:

- `SWITCH:INIT` — component mount / destroy + props snapshot
- `SWITCH:INTERACTION` — toggle / select events
- `SWITCH:RENDER` — reserved for derived-state logging

Default level is `silent` (production-safe). Toggle via `window.components['svelte-switch'].logging.*` from the browser console, or import `enableLogging` / `setLogLevel` / `setCategoryLevel` directly.

### ✨ Added — Demo site

Site restructured to mirror `@keenmate/svelte-treeview`: card-grid landing at `/`, per-topic pages under `/examples/*`. New routes:

- `/examples/binary` — Switch axes (size, orientation, checked, disabled)
- `/examples/multi` — MultiSwitch axes + keyboard
- `/examples/labels` — interactive label picker + 16-cell matrix (positions × modes × orientations)
- `/examples/styled` — `itemStyles` patterns including the priority-levels showcase
- `/examples/theming` — 7 brand presets (Dark, Neon, Audi Sport, Rounded Pink, Sharp Brutalist, Material, Glassmorphism), each with per-theme `itemStyles`
- `/examples/base-variables` — interactive playground with one row per `--base-*`, color picker + text input + clear button per row, live preview, copy-pasteable CSS export

### 🧹 Internal

- **Three label-rendering snippets** (`labelContent`, `singleLabel`, `perStepLabels`) replace ≈320 lines of duplicated branch markup in MultiSwitch.
- **Shared helpers** extracted to `src/lib/utils.ts`: `getStyleForIndex`, `itemAt`, `resolveLabelText`. Covered by 15 unit tests via `vitest`.
- **SCSS split into per-component partials** — Switch.svelte and MultiSwitch.svelte previously both inlined the entire stylesheet, shipping each other's CSS as unused selectors. New structure:
    - `src/lib/assets/_theme.scss` — variables, fallback constants, chain SCSS strings, mixins, calc functions. NO style rules.
    - `src/lib/assets/_switch.scss` — `.switch { ... }` only.
    - `src/lib/assets/_multi-switch.scss` — `.multi-switch-container`, `.labels-container`, `.label-single`, `.multi-switch`, `.default-label`.
    - `src/lib/assets/main.scss` — `@forward` aggregator for consumers wanting both via the package's `./styles.scss` export.
- **Theme cascade implementation** uses SCSS chain strings (`$bg-off-chain`, `$thumb-bg-chain`, etc.) inlined at the property declarations rather than declaring `--sw-*` vars on the component root. The "set on root" pattern would shadow parent overrides because CSS gives priority to same-element declarations over inherited ones.
- Vendored `loglevel-esm.js` + `loglevel-plugin-prefix-esm.js` under `src/lib/vendor/loglevel/` with adjacent `.d.ts` shims (zero runtime deps, strict TS stays clean).
- Tooling parity with svelte-treeview: prettier, eslint flat config, `.editorconfig`, `vitest`, vite `define:` block exposing `__VERSION__` / `__PACKAGE_NAME__` / `__AUTHOR__` / `__LICENSE__` / `__HOMEPAGE__` / `__REPOSITORY__`.
- `package.json` adds `./component-variables.manifest.json` to `exports` and `files`. `sideEffects` includes `./dist/index.js` so consumers' bundlers don't tree-shake the global API registration.
- `vitest.config.ts` excludes `.svelte-kit/` so tests aren't double-counted (svelte-package mirrors source into `__package__/`).
- `tsconfig.json` excludes `src/lib/vendor/**/*.js` from svelte-check (vendored, plain JS); types still flow via the adjacent `.d.ts` files.
- Build-time stale `src/lib/assets/main.css` deleted (138-line snapshot from a pre-1.0 build, out of sync with `main.scss`).

## [1.4.0] - 2025-01-23

### ✨ Added

#### **Label Rendering Modes**
- **New `labelRenderMode` Property** - Choose between `'absolute'` (default) and `'block'` rendering modes
- **Absolute Mode** - Labels use absolute positioning (existing behavior, may overlap container borders)
- **Block Mode** - Labels take up actual space in document flow, staying within container boundaries
- **Flexible Layout** - Block mode uses proper flexbox layout ensuring labels appear in correct positions

#### **Interactive Labels**
- **Clickable Labels** - In vertical orientation with left/right positions, labels become clickable when no `thumbTemplate` is defined
- **Instant Navigation** - Click any label to jump directly to that step
- **Visual Feedback** - Hover effects and cursor changes indicate interactive labels
- **Smart Conditions** - Only active when switch is enabled and no custom thumb template is used

#### **Label Content System**
- **New `labelMember` Property** - Extract labels from object property: `labelMember="name"` reads `item.name`
- **Enhanced `labelCallback`** - Custom function with item access: `(item: any, index: number) => string`
- **Priority-Based Logic** - Text resolution follows priority: `labelMember` → `labelCallback` → default
- **Clean Defaults** - When no member or callback provided, defaults to "Option 1", "Option 2", etc.
- **Object Support** - Perfect for arrays of objects with structured data

#### **Enhanced Label Positioning**
- **Unified Logic** - Consistent label positioning for both horizontal and vertical switches
- **DOM Order Optimization** - Top/left labels render before switch, bottom/right labels render after switch
- **Proper Spacing** - Block mode labels align perfectly with switch steps using correct gap calculations
- **All Position Support** - Vertical switches now support all label positions (top, bottom, left, right)

### 🔄 Changed

#### **CSS Architecture Improvements**
- **Container-Level Properties** - CSS custom properties moved to container level for label access
- **Gap-Based Spacing** - Labels use same spacing as switch steps for perfect alignment
- **Flexbox Layout** - Block mode uses appropriate flex-direction based on label position
- **Transition Optimization** - Removed font-weight from transitions for crisp label selection changes

#### **Component Structure**
- **Template Restructure** - Labels now render as siblings to switch for proper block layout
- **Conditional Rendering** - Smart logic determines label placement based on position and render mode
- **Enhanced Props** - Added `labelRenderMode` to external update methods and type interfaces

### 🐛 Fixed

#### **Label Alignment Issues**
- **Vertical Label Spacing** - Fixed gap mismatch between labels and switch steps in absolute mode
- **Text Wrapping** - Added `white-space: nowrap` to prevent label text wrapping in absolute mode
- **Position Accuracy** - Labels now align perfectly with their corresponding switch steps
- **Missing Positions** - Added support for vertical switches with top/bottom labels in absolute mode

#### **Layout Improvements**
- **Block Mode Positioning** - Labels now appear in correct visual positions based on DOM order
- **Container Boundaries** - Block mode labels stay within parent container instead of overlapping borders
- **Responsive Scaling** - All label positioning scales correctly with component size

### 📚 Documentation

#### **Updated Examples**
- **Render Mode Examples** - New examples showcasing both absolute and block rendering modes
- **Interactive Labels Demo** - Documentation of clickable label functionality
- **API Reference Updates** - Added `labelRenderMode` property to all relevant documentation
- **Usage Patterns** - Clear guidance on when to use each rendering mode

#### **Enhanced API Documentation**
- **Method Signatures** - Updated external update methods to include `labelRenderMode`
- **Property Tables** - Added new property documentation with types and descriptions
- **Code Examples** - Real-world usage examples for different label configurations

### 🎯 Use Cases

#### **Block Mode Benefits**
- **Form Layouts** - Labels stay within form boundaries and don't overlap other elements
- **Card Components** - Switch with labels fits properly within card containers
- **Responsive Design** - Labels contribute to natural document flow for better responsive behavior
- **Accessibility** - Screen readers get more predictable layout structure

#### **Interactive Labels**
- **Enhanced UX** - Users can click labels for faster navigation in multi-step switches
- **Mobile Friendly** - Larger tap targets improve mobile usability
- **Visual Feedback** - Clear indication of interactive elements with hover states

## [1.3.0] - 2025-01-22

### ✨ Added

#### **Default Label Support**
- **No Template Required** - Labels now display automatically when `shouldDisplayLabels={true}` without needing `labelTemplate`
- **Smart Content Detection** - Uses `items` array content when available, falls back to "Item 1", "Item 2", etc.
- **SCSS Customization** - Added `$default-label-*` variables for styling default labels
- **Active Label Highlighting** - Bold font-weight for selected labels with smooth transitions

#### **Enhanced Vertical Label Positioning**
- **Left/Right Positioning** - Vertical switches now respect `labelPosition="left"` and `labelPosition="right"`
- **Logical Positioning** - Horizontal: all positions (top/bottom/left/right), Vertical: only left/right positions
- **Consistent API** - Same `labelPosition` prop works for both orientations with appropriate logic

#### **SCSS Variables for Default Labels**
```scss
$default-label-color: #666;                    // Normal label color
$default-label-active-color: #333;             // Active label color
$default-label-font-size: 14px;                // Base font size
$default-label-font-weight: normal;            // Normal font weight
$default-label-active-font-weight: bold;       // Active label font weight
```

### 🔄 Changed

#### **Label Display Logic**
- **Simplified Usage** - `shouldDisplayLabels={true}` now works without requiring custom `labelTemplate`
- **Template Priority** - When `labelTemplate` is provided, it takes precedence over default rendering
- **Position-Aware Rendering** - Vertical labels only render for left/right positions (not top/bottom)

### 📚 Documentation

#### **Updated Demo Pages**
- **Default Labels Section** - New showcase demonstrating label usage without templates
- **Position Examples** - Clear examples of left/right positioning for vertical switches
- **SCSS Customization Guide** - Documentation of all customizable label variables

## [1.3.0-rc02] - 2025-01-17

### 🔄 Changed

#### **Template Naming Consistency (BREAKING)**
- **Renamed `label` to `labelTemplate`** - All template props now follow consistent `xxxTemplate` naming
- **Updated Demo Pages** - All examples now use `labelTemplate` instead of `label`
- **Better Developer Experience** - Clear distinction between data props and template props

#### **Performance Optimizations**
- **Context Object Caching** - Added `currentStepContext` derived object to reduce template re-renders
- **Optimized Template Passing** - More efficient context passing to template snippets

#### **API Enhancements**
- **Enhanced Update Methods** - Added `onToggle` and `onItemChange` callback support
- **Complete Property Coverage** - Update methods now support all component properties
- **Web Component Support** - Added `disableThumbRender` prop to prevent stale template rendering

### 📚 Documentation

#### **Updated Examples**
- **Migration Guide** - Clear instructions for `label` → `labelTemplate` change
- **Enhanced API Tables** - Updated to include `labelTemplate`, `disableThumbRender`, and callback properties
- **Method Documentation** - Complete update method parameter coverage
- **Web Component Guide** - Added documentation for using `disableThumbRender` in non-reactive environments

## [1.3.0-rc01] - 2025-01-17

### ✨ Added

#### **thumbTemplate Snippet Support**
- **New `thumbTemplate` Prop** - Enhanced snippet for thumb content with extended context
- **Enhanced Context** - Provides `{ currentIndex, currentItem, itemsCount }` instead of `{ currentIndex, item, isSelected }`
- **Dual Template Support** - Both `children` and `thumbTemplate` can be used simultaneously
- **Priority System** - `thumbTemplate` takes precedence when both are provided
- **Step Counter Support** - Perfect for displaying "Step 1/4" or progress indicators

#### **Template Naming Consistency**
- **BREAKING**: Renamed `label` to `labelTemplate` in MultiSwitch component
- **Consistent Naming** - All snippet props now follow the `xxxTemplate` pattern
- **Better Developer Experience** - Clear distinction between data props and template props

#### **Template Context Comparison**
| Template | Context | Use Case |
|----------|---------|----------|
| `children` | `{ currentIndex, item, isSelected }` | Basic content rendering for all steps |
| `thumbTemplate` | `{ currentIndex, currentItem, itemsCount }` | Enhanced thumb content with total count |

#### **Usage Examples**
```svelte
<!-- Basic children template -->
<Switch>
  {#snippet children({ isSelected })}
    {isSelected ? '✓' : '✗'}
  {/snippet}
</Switch>

<!-- Enhanced thumbTemplate -->
<Switch items={['Off', 'On']}>
  {#snippet thumbTemplate({ currentIndex, currentItem, itemsCount })}
    <div>Step {currentIndex + 1}/{itemsCount}</div>
    <div>{currentItem}</div>
  {/snippet}
</Switch>
```

### 🔄 Changed

#### **Template Rendering Logic**
- **Fallback Behavior** - Components now check for `thumbTemplate` first, then fall back to `children`
- **Backward Compatibility** - Existing `children` usage remains unchanged
- **Selective Rendering** - MultiSwitch uses `children` for step segments, `thumbTemplate` for active thumb

#### **Performance Optimizations**
- **Context Object Caching** - Added `currentStepContext` derived object to reduce template re-renders
- **Consistent Template Passing** - Optimized how context is passed to template snippets

#### **API Enhancements**
- **Enhanced Update Methods** - Added `onToggle` and `onItemChange` callback support in external update methods
- **Complete Property Coverage** - Update methods now support all component properties

### 🚨 Breaking Changes

#### **Template Prop Naming**
- **MultiSwitch `label` → `labelTemplate`** - Renamed for consistency with other template props
- **Migration**: Replace `{#snippet label(...)}` with `{#snippet labelTemplate(...)}`
- **Automatic**: IDEs with find/replace can easily update existing code

### 📚 Documentation

#### **New Demo Section**
- **Custom Styling Page** - Added "thumbTemplate vs children" demonstration
- **Interactive Examples** - Live examples showing both Switch and MultiSwitch with step counters
- **Context Comparison** - Clear documentation of when to use each template type
- **Code Examples** - Copy-paste ready examples for both template patterns

#### **Updated API Documentation**
- **labelTemplate Property** - Added documentation for renamed label template prop
- **Enhanced Update Methods** - Updated method signatures to include callback support
- **Template Context Examples** - Clear examples showing different template usage patterns

## [1.2.0] - 2025-01-16

### ✨ Added

#### **Label Support for Switches**
- **New `labels` Prop** - Both Switch and MultiSwitch components now support optional labels
- **Flexible Configuration** - Pass labels as array of strings matching your steps/states
- **Automatic Positioning** - Labels align appropriately based on switch orientation
- **Responsive Styling** - Labels scale with component size and adapt to theme
- **MultiSwitch Labels** - Support for multiple labels (e.g., `['Low', 'Medium', 'High']`)
- **Switch Labels** - Binary state labels (e.g., `['OFF', 'ON']`)

### 🔄 Changed

#### **Property Naming Improvements**
- **BREAKING**: Renamed `borderColor` to `thumbBorderColor` in `StepStyle` interface
- **Enhanced Clarity** - Property now clearly indicates it affects thumb border only
- **Future-Ready** - Leaves room for separate `borderColor` property for switch container
- **Consistent Naming** - Matches pattern of `thumbColor` for thumb-specific properties

#### **Styling System Enhancements**
- **Flexible itemStyles Type** - `itemStyles` prop now accepts either `StepStyle[]` (array) or `StepStyle` (single object)
- **Array Mode**: Each item gets its own style - `itemStyles={[style1, style2, style3]}`
- **Object Mode**: All items share same style - `itemStyles={singleStyle}`
- **CSS Coalescing Fixed** - Switch component now properly uses CSS custom properties with fallbacks
- **Background Color Fix** - Switch component styling now matches MultiSwitch behavior

#### **Demo Site Modernization**
- **Svelte 5 Snippets** - Converted all demo pages from legacy slot syntax to modern snippet syntax
- **Consistent API** - Updated all examples to use `itemsCount` and `itemStyles` consistently
- **Updated Documentation** - All property references now use correct naming conventions

### 🐛 Fixed

#### **Switch Component Styling**
- **Background Color Override** - Fixed Switch component ignoring custom `backgroundColor` from `itemStyles`
- **CSS Custom Properties** - Switch now uses `var(--current-bg-color, $switch-bg-off)` coalescing pattern
- **Thumb Border Support** - Added missing border styling support to Switch thumb element
- **Styling Consistency** - Both Switch and MultiSwitch now handle custom colors identically

#### **Property Consistency**
- **Border Color Rendering** - `thumbBorderColor` now properly renders on both Switch and MultiSwitch thumbs
- **Type Safety** - Updated all TypeScript interfaces to reflect new property names
- **Documentation Accuracy** - All code examples and property descriptions now match actual API

### 📚 Documentation

#### **Updated Examples**
- **Property Names** - All demo pages updated to use `thumbBorderColor` instead of `borderColor`
- **Code Samples** - Updated all code examples in documentation to reflect API changes
- **SCSS Comments** - Clarified that border styling is specifically for thumb elements

## [1.1.0] - 2025-01-16

### ✨ Added

#### **External Update Mechanism**
- **Update Methods** - Both Switch and MultiSwitch components now export `update()` methods for external property updates
- **JavaScript/HTML Integration** - Addresses Svelte 5 reactivity issues when components are used directly from vanilla JavaScript or HTML
- **Type-Safe Updates** - Update methods accept partial property objects with full TypeScript support
- **Backward Compatibility** - Existing Svelte-to-Svelte usage remains unchanged

#### **Switch Update Method**
```javascript
switchInstance.update({
  checked: true,
  size: 80,
  isDisabled: false,
  orientation: 'vertical'
});
```

#### **MultiSwitch Update Method**
```javascript
multiSwitchInstance.update({
  selectedIndex: 2,
  size: 70,
  stepsCount: 5,
  stepStyles: [/* style objects */],
  isDisabled: true,
  orientation: 'horizontal'
});
```

### 📚 Documentation

- **Updated README.md** - Added comprehensive external usage section with examples
- **Updated CLAUDE.md** - Added development guidance for external update mechanism
- **API Reference Enhancement** - Added method documentation tables for both components

### 🔧 Technical Details

- **Preserves Svelte Props** - Normal Svelte binding and props continue to work as expected
- **External Only Feature** - Update methods are specifically for non-Svelte environments
- **Selective Updates** - Only provided properties are updated, undefined values are ignored
- **Reactivity Maintained** - Updates trigger proper reactivity and re-rendering

## [1.0.0] - 2025-01-16

### 🎉 Initial Release

A modern, customizable switch component library for Svelte 5 with comprehensive features and professional documentation.

### ✨ Added

#### **Core Components**
- **Switch Component** - Binary on/off toggle functionality
- **MultiSwitch Component** - Variable step switches (3+ options)
- **TypeScript Support** - Complete type safety with interfaces
- **Svelte 5 Compatibility** - Built with modern Svelte 5 features ($state, $derived, snippets)

#### **Customization Features**
- **Flexible Sizing** - Scalable to any size (30px-120px+) with proportional scaling
- **Dual Orientations** - Both horizontal and vertical layouts supported
- **Custom Content** - Slot support for icons, text, or any content in thumb
- **Step Styling** - Individual color schemes for each step in multi-step switches
- **Theme Support** - Built-in themes and custom color picker capabilities

#### **Accessibility**
- **Full Keyboard Navigation** - Arrow keys, Tab, Space, Enter support
- **ARIA Compliance** - Proper ARIA attributes and screen reader support
- **Focus Management** - Visible focus indicators and proper tab order
- **Touch Targets** - Minimum 40px recommended for mobile accessibility

#### **Styling Architecture**
- **SCSS + CSS Dual Support** - Both formats included for maximum compatibility
- **CSS Custom Properties** - Dynamic styling with CSS variables
- **Calculation Functions** - SCSS functions for consistent sizing and spacing
- **Zero Dependencies** - Only peer dependency on Svelte 5

#### **Demo Website**
- **Live Interactive Demos** - Comprehensive showcase at https://svelte-switch.demo.keenmate.com
- **Three-Column Layout** - Demo, Controls, and Documentation sections
- **Dark Sidebar Navigation** - Professional layout inspired by modern documentation sites
- **Real-Time Property Controls** - Interactive controls for all component properties
- **Code Examples** - Copy-paste ready code snippets

### 🏗️ Technical Architecture

#### **Naming Conventions**
- **verbNoun Pattern** - Boolean properties use `isDisabled` instead of `disabled`
- **Clear Terminology** - `orientation` instead of `direction`, `stepsCount` instead of `steps`
- **Consistent API** - Eliminates ambiguity between counts vs arrays

#### **Performance Optimizations**
- **CSS Scaling** - All sizing uses CSS transforms rather than different assets
- **SCSS Calculations** - Complex calculations handled at build time
- **Efficient Rendering** - Minimal DOM updates with reactive derived values

#### **Build & Deployment**
- **Docker Support** - Multi-stage build with nginx for production deployment
- **Static Site Generation** - SvelteKit static adapter for optimal performance
- **Makefile Commands** - Convenient build, development, and Docker commands

### 📦 Package Details

- **Name**: `@keenmate/svelte-switch`
- **Version**: `1.0.0`
- **License**: MIT
- **Repository**: https://github.com/keenmate/svelte-switch
- **Demo**: https://svelte-switch.demo.keenmate.com

### 🎯 API Reference

#### **Switch Props**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Bindable checked state |
| `isDisabled` | `boolean` | `false` | Disable switch interaction |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Switch orientation |
| `size` | `number` | `50` | Switch size in pixels |
| `onToggle` | `(checked: boolean) => void` | `undefined` | Toggle event handler |
| `children` | `Snippet<[{ checked: boolean }]>` | `undefined` | Custom thumb content |

#### **MultiSwitch Props**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selectedIndex` | `number` | `0` | Bindable selected step index |
| `isDisabled` | `boolean` | `false` | Disable switch interaction |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Switch orientation |
| `size` | `number` | `50` | Switch size in pixels |
| `stepsCount` | `number` | `3` | Number of steps |
| `stepStyles` | `StepStyle[]` | `[]` | Custom styling for each step |
| `onItemChange` | `(index: number) => void` | `undefined` | Item change event handler |
| `children` | `Snippet` | `undefined` | Custom thumb content |

### 🔧 Development Notes

This release establishes a solid foundation for a modern Svelte 5 component library with:
- Professional documentation and demo site
- Comprehensive accessibility support
- Flexible styling system
- Type-safe API with clear naming conventions
- Production-ready build and deployment pipeline

[1.3.0-rc02]: https://github.com/keenmate/svelte-switch/releases/tag/v1.3.0-rc02
[1.3.0-rc01]: https://github.com/keenmate/svelte-switch/releases/tag/v1.3.0-rc01
[1.2.0]: https://github.com/keenmate/svelte-switch/releases/tag/v1.2.0
[1.1.0]: https://github.com/keenmate/svelte-switch/releases/tag/v1.1.0
[1.0.0]: https://github.com/keenmate/svelte-switch/releases/tag/v1.0.0