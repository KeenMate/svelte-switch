# @keenmate/svelte-switch

A modern, customizable switch component library for Svelte 5 with support for both binary and multi-step switches.

🎮 **[Live Demo & Documentation](https://svelte-switch.demo.keenmate.com)**

## Features

- **Binary Switch** and **Multi-Step Switch** components
- **Generic over `<T>`** — `items` flow into snippet contexts with full type inference
- **Five named sizes** (`xs`/`sm`/`md`/`lg`/`xl`) aligned with `@keenmate/pure-admin` form-element heights, plus numeric sizing
- **Snippet-based templating** — `thumb`, `segment`, `label` snippets with consistent `{ index, item, isSelected }` context
- **Cross-library theming** via `--base-*` cascade (compatible with `@keenmate/theme-designer`); per-instance `--sw-*` overrides; data-driven via `itemStyles`
- **Horizontal + vertical** orientations
- **Auto labels** with `shouldDisplayLabels` — pick text from `items`, an `item` property (`labelMember`), or a custom callback (`labelCallback`)
- **Clickable labels** in vertical orientation — proper `<button>` elements, full keyboard activation
- `window.components['svelte-switch']` global API matching sibling KeenMate libs (`web-multiselect`, `web-daterangepicker`)
- Categorized **logger** (vendored loglevel) with runtime-controllable log levels per category
- **Accessibility**: keyboard navigation, ARIA roles, focus rings
- **No runtime dependencies** — only Svelte 5 as a peer

> **Migrating from 1.x?** See the [v2.0.0 entry in CHANGELOG.md](./CHANGELOG.md#200---2026-04-25) for the snippet API rename table and `update()` removal recipe.

## Installation

```bash
npm install @keenmate/svelte-switch
```

## Usage

### Basic Switch

```svelte
<script>
  import { Switch } from '@keenmate/svelte-switch';

  let checked = $state(false);
</script>

<Switch bind:checked />
```

### Vertical Switch

```svelte
<Switch bind:checked orientation="vertical" size={60} />
```

### Switch with Custom Thumb Content

```svelte
<Switch size={60}>
  {#snippet thumb({ index, item, isSelected })}
    <span>{isSelected ? '✓' : '✗'}</span>
  {/snippet}
</Switch>
```

The `thumb` snippet receives `{ index, item, isSelected }`. With `items` provided, `item` is typed as the corresponding tuple element:

```svelte
<Switch items={['Off', 'On'] as const}>
  {#snippet thumb({ index, item })}
    <span>{index + 1}/2 — {item}</span>
  {/snippet}
</Switch>
```

### Multi-Step Switch

```svelte
<script>
  import { MultiSwitch } from '@keenmate/svelte-switch';

  let selectedIndex = $state(0);
</script>

<MultiSwitch bind:selectedIndex itemsCount={4} size={80}>
  {#snippet thumb({ index })}
    <span>{['Low', 'Med', 'High', 'Max'][index]}</span>
  {/snippet}
</MultiSwitch>
```

`MultiSwitch` exposes three snippets, each with one job:

| Snippet  | Renders                            | Context                                    |
| -------- | ---------------------------------- | ------------------------------------------ |
| `thumb`  | content inside the moving thumb    | `{ index, item }`                          |
| `segment`| content per step background        | `{ index, item, isSelected }`              |
| `label`  | content per displayed label        | `{ index, item, isSelected }`              |

```svelte
<MultiSwitch items={['Cold', 'Warm', 'Hot']}>
  {#snippet thumb({ item })}
    <span>{item}</span>
  {/snippet}
  {#snippet segment({ index, isSelected })}
    <span style="opacity: {isSelected ? 1 : 0.4}">●</span>
  {/snippet}
</MultiSwitch>
```

### Multi-Step Switch with Default Labels (v1.3.0+)

```svelte
<!-- Automatic labels with absolute positioning (default) -->
<MultiSwitch
  bind:selectedIndex
  items={['Small', 'Medium', 'Large']}
  shouldDisplayLabels={true}
  labelPosition="right"
  orientation="vertical"
  size={70}
/>

<!-- Block positioning - labels take up actual space in layout -->
<MultiSwitch
  bind:selectedIndex
  items={['Small', 'Medium', 'Large']}
  shouldDisplayLabels={true}
  labelPosition="bottom"
  labelRenderMode="block"
  size={70}
/>

<!-- Labels are clickable in vertical orientation (left/right positions) -->
<MultiSwitch
  bind:selectedIndex
  itemsCount={4}
  shouldDisplayLabels={true}
  labelPosition="right"
  orientation="vertical"
  size={70}
/>
```

### Multi-Step Switch with Object Items and labelMember

```svelte
<script>
  const productSizes = [
    { name: 'Small', value: 'S', stock: 10 },
    { name: 'Medium', value: 'M', stock: 5 },
    { name: 'Large', value: 'L', stock: 2 }
  ];
</script>

<MultiSwitch
  bind:selectedIndex
  items={productSizes}
  labelMember="name"
  shouldDisplayLabels={true}
  labelPosition="right"
  orientation="vertical"
  size={70}
/>
```

### Multi-Step Switch with labelCallback

```svelte
<script>
  const products = [
    { name: 'Basic', price: 10 },
    { name: 'Pro', price: 25 },
    { name: 'Enterprise', price: 50 }
  ];
</script>

<MultiSwitch
  bind:selectedIndex
  items={products}
  labelCallback={(item, index) => `${item.name} - $${item.price}`}
  shouldDisplayLabels={true}
  labelPosition="right"
  orientation="vertical"
  size={70}
/>
```

### Multi-Step Switch with Custom Label Template

```svelte
<MultiSwitch
  bind:selectedIndex
  items={['Small', 'Medium', 'Large']}
  shouldDisplayLabels={true}
  labelPosition="right"
  orientation="vertical"
  size={70}
>
  {#snippet label({ index, item, isSelected })}
    <span style="color: {isSelected ? '#333' : '#666'}; font-weight: {isSelected ? 'bold' : 'normal'}">
      {item} Size
    </span>
  {/snippet}
</MultiSwitch>
```

### Multi-Step Switch with Custom Styling

```svelte
<script>
  const temperatureStyles = [
    { backgroundColor: '#3b82f6', thumbColor: '#1e40af', thumbBorderColor: '#2563eb' }, // Cold
    { backgroundColor: '#10b981', thumbColor: '#047857', thumbBorderColor: '#059669' }, // Warm
    { backgroundColor: '#f59e0b', thumbColor: '#d97706', thumbBorderColor: '#f59e0b' }, // Hot
    { backgroundColor: '#ef4444', thumbColor: '#dc2626', thumbBorderColor: '#ef4444' }  // Very Hot
  ];
</script>

<MultiSwitch bind:selectedIndex itemsCount={4} size={70} itemStyles={temperatureStyles}>
  {#snippet thumb({ index })}
    <span>{['❄️', '🌡️', '🔥', '🌋'][index]}</span>
  {/snippet}
</MultiSwitch>
```

## API Reference

### `Switch<T>` Props

| Prop          | Type                                          | Default        | Description                                                       |
| ------------- | --------------------------------------------- | -------------- | ----------------------------------------------------------------- |
| `checked`     | `boolean`                                     | `false`        | Bindable checked state                                            |
| `isDisabled`  | `boolean`                                     | `false`        | Disable the switch                                                |
| `orientation` | `'horizontal' \| 'vertical'`                  | `'horizontal'` | Switch orientation                                                |
| `size`        | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| number` | `'md'`      | Named size (matches pure-admin form heights: 31/33/35/38/41px) or pixel-scale number (`scale = size / 50`) |
| `items`       | `readonly [T, T] \| null`                     | `null`         | Two data items keyed to off/on; `item` of `thumb` reads from here |
| `itemStyles`  | `StepStyle[] \| StepStyle`                    | `[]`           | Per-state styles (array) or shared style (object)                 |
| `onToggle`    | `(checked: boolean) => void`                  | -              | Toggle event handler                                              |
| `thumb`       | `Snippet<[{ index, item, isSelected }]>`      | -              | Content rendered inside the moving thumb                          |

### `MultiSwitch<T>` Props

| Prop                  | Type                                                       | Default        | Description                                                                |
| --------------------- | ---------------------------------------------------------- | -------------- | -------------------------------------------------------------------------- |
| `selectedIndex`       | `number`                                                   | `0`            | Bindable selected step index                                               |
| `isDisabled`          | `boolean`                                                  | `false`        | Disable the switch                                                         |
| `orientation`         | `'horizontal' \| 'vertical'`                               | `'horizontal'` | Switch orientation                                                         |
| `size`                | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| number`           | `'md'`         | Named size (matches pure-admin form heights) or pixel-scale number         |
| `itemsCount`          | `number`                                                   | `3`            | Number of steps; ignored when `items` is provided                          |
| `items`               | `readonly T[] \| null`                                     | `null`         | Optional data array; `items.length` overrides `itemsCount` when both given |
| `itemStyles`          | `StepStyle[] \| StepStyle`                                 | `[]`           | Per-step styles (array) or shared style (object)                           |
| `shouldDisplayLabels` | `boolean`                                                  | `false`        | Enable automatic label display                                             |
| `labelPosition`       | `'top' \| 'bottom' \| 'left' \| 'right'`                   | `'bottom'`     | Label position (vertical orientation supports left/right only)             |
| `labelRenderMode`     | `'absolute' \| 'block'`                                    | `'absolute'`   | `absolute` may overlap container; `block` takes space in document flow     |
| `labelMember`         | `string`                                                   | -              | Read label text from `item[labelMember]`                                   |
| `labelCallback`       | `(item: T \| undefined, index: number) => string`          | -              | Custom label resolver; called when `labelMember` doesn't match             |
| `onItemChange`        | `(index: number) => void`                                  | -              | Selection change handler                                                   |
| `thumb`               | `Snippet<[{ index, item }]>`                               | -              | Content inside the moving thumb (one render)                               |
| `segment`             | `Snippet<[{ index, item, isSelected }]>`                   | -              | Content per step background (one render per step)                          |
| `label`               | `Snippet<[{ index, item, isSelected }]>`                   | -              | Custom label content; falls back to `getLabelText` resolver                |

### StepStyle Interface

```typescript
interface StepStyle {
  backgroundColor?: string;    // Switch/MultiSwitch background color
  thumbColor?: string;         // Thumb element color
  thumbBorderColor?: string;   // Thumb border color
}
```

## Theming

Two layers of CSS custom properties drive the visuals — set whichever fits your scope:

- **`--base-*`** — cross-library theme tokens shared with `@keenmate/web-multiselect`,
  `@keenmate/web-daterangepicker`, and the rest of the KeenMate ecosystem. Set once
  on a parent (or `:root`), every nested KeenMate component picks them up.
- **`--sw-*`** — switch-specific overrides for per-instance / per-theme tweaks
  without affecting other components.

Resolution order at every property: **`itemStyles` data** → **`--sw-*`** → **`--base-*`** → hardcoded fallback.

#### Sizing convention

Border-radius and font-size variables are **unitless coefficients** multiplied
by `--sw-rem` (default `10px`). This matches the pattern used by
`@keenmate/web-multiselect` (`--ms-rem`), `@keenmate/web-daterangepicker`
(`--drp-rem`), and `@keenmate/pure-admin` (`html { font-size: 10px }`):

```css
--base-border-radius-sm: 0.4;    /* × 10px = 4px */
--base-border-radius-sm: 2.4;    /* × 10px = 24px (pillow corners) */
--base-font-size-sm: 1.6;        /* × 10px = 16px */
```

For pure-admin integration, set `--sw-rem: 1rem` somewhere up the tree —
all sizes become rem-based and respect the user's font-size preference.

#### Named sizes

The `size` prop accepts `'xs' | 'sm' | 'md' | 'lg' | 'xl'` (matching
pure-admin's form-element height table) or a number for explicit sizing.
Default is `'md'` (35px tall).

```svelte
<Switch size="xs" />        <!-- 31px tall, matches pure-admin XS input -->
<Switch size="sm" />        <!-- 33px -->
<Switch size="md" />        <!-- 35px (default) -->
<Switch size="lg" />        <!-- 38px -->
<Switch size="xl" />        <!-- 41px -->

<Switch size={80} />        <!-- numeric: scale = 80 / 50 = 1.6, height = 51.2px -->
```

Each named size resolves through `--base-input-size-{size}-height` ×
`--sw-rem`, so per-app overrides via the cross-library cascade work too:

```css
:root {
  --base-input-size-md-height: 4.0;  /* default switch becomes 40px tall */
}
```

```svelte
<div style="--base-accent-color: #8b5cf6; --base-primary-bg: #1f2937;">
  <Switch bind:checked />
  <!-- focus ring + on-state turn purple, off surface turns dark gray -->
</div>

<!-- Or per-instance: -->
<Switch
  bind:checked
  style="--sw-bg-on: #ef4444; --sw-border-radius: 999px"
/>
```

Variables the library consumes are catalogued in `component-variables.manifest.json`
at the package root (compatible with `@keenmate/theme-designer`). The interactive
playground at `/examples/base-variables` lets you twiddle every `--base-*` and
watch the switches react live.

## Vanilla JavaScript usage

Use Svelte 5's `mount()` with a reactive props object — the components have no `update()` method (it was removed in 2.0; props are reactive in Svelte 5):

```javascript
import { mount } from 'svelte';
import { Switch } from '@keenmate/svelte-switch';

const props = $state({ checked: false, size: 50 });

mount(Switch, {
  target: document.getElementById('switch-container'),
  props
});

// Mutate the state object — the component updates reactively:
props.checked = true;
props.size = 80;
```

## Logging

Categorized logger (vendored `loglevel`) with three categories:

- `SWITCH:INIT` — component mount / destroy + props snapshot
- `SWITCH:INTERACTION` — toggle / select events
- `SWITCH:RENDER` — derived-state changes (reserved)

Default level is `silent`. Toggle from the browser console:

```js
window.components['svelte-switch'].logging.enableLogging();
window.components['svelte-switch'].logging.setCategoryLevel('SWITCH:INTERACTION', 'trace');
```

Or import the controls directly: `enableLogging`, `disableLogging`, `setLogLevel`, `setCategoryLevel`, `getCategories` are all exported from the package.

## Keyboard Navigation

- **Arrow Keys**: navigate between steps (all directions)
- **Tab**: focus the switch
- **Enter / Space**: toggle binary switch
- **Enter / Space** on per-step labels (vertical + clickable mode): jump to that step

## Requirements

- Svelte 5.0.0 or higher
- Modern browser with CSS custom properties support

## License

MIT

## Demo & Documentation

🎮 **[Interactive Demo Website](https://svelte-switch.demo.keenmate.com)**

Explore all features with live examples, interactive controls, and comprehensive documentation.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for detailed release notes and version history.

## Contributing

Issues and pull requests are welcome at https://github.com/keenmate/svelte-switch