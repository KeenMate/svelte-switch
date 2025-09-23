# @keenmate/svelte-switch

A modern, customizable switch component library for Svelte 5 with support for both binary and multi-step switches.

🎮 **[Live Demo & Documentation](https://svelte-switch.demo.keenmate.com)**

## Features

- **Binary Switch**: Classic on/off toggle functionality
- **Multi-Step Switch**: Support for 3+ step switches (like volume controls, temperature settings)
- **Orientation Support**: Both horizontal and vertical layouts
- **Custom Sizing**: Scalable to any size while maintaining proportions
- **Custom Content**: Slot support for icons, text, or any content in the thumb
- **Step Styling**: Individual styling for each step in multi-step switches
- **Label Support**: Optional labels with flexible rendering modes (absolute/block positioning)
- **Interactive Labels**: Clickable labels for enhanced user experience in vertical multi-step switches
- **Accessibility**: Full keyboard navigation and ARIA support
- **TypeScript**: Complete type safety with TypeScript interfaces
- **No Dependencies**: Zero external dependencies, just peer dependency on Svelte 5

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

### Switch with Labels

```svelte
<Switch
  bind:checked
  labels={['OFF', 'ON']}
/>
```

### Vertical Switch

```svelte
<Switch
  bind:checked
  orientation="vertical"
  size={60}
/>
```

### Switch with Custom Content

```svelte
<Switch size={60}>
  {#snippet children({ currentIndex, item, isSelected })}
    <span>{isSelected ? '✓' : '✗'}</span>
  {/snippet}
</Switch>
```

### Enhanced Thumb Template (v1.3.0+)

The `thumbTemplate` snippet provides enhanced context for more sophisticated thumb content:

```svelte
<!-- Step counter example -->
<Switch items={['Off', 'On']}>
  {#snippet thumbTemplate({ currentIndex, currentItem, itemsCount })}
    <div style="font-size: 0.8rem; text-align: center;">
      <div>Step {currentIndex + 1}/{itemsCount}</div>
      <div>{currentItem}</div>
    </div>
  {/snippet}
</Switch>

<!-- MultiSwitch with progress indicator -->
<MultiSwitch bind:selectedIndex itemsCount={4}>
  {#snippet thumbTemplate({ currentIndex, currentItem, itemsCount })}
    <span style="font-size: 0.7rem;">
      {currentIndex + 1}/{itemsCount}
    </span>
  {/snippet}
</MultiSwitch>
```

**Template Comparison:**
- `children`: `{ currentIndex, item, isSelected }` - Basic content for all steps
- `thumbTemplate`: `{ currentIndex, currentItem, itemsCount }` - Enhanced context with total count

### Web Component Integration

When using switches in non-reactive environments (web components, plain JavaScript, or any context where Svelte's reactivity system isn't available), the `disableThumbRender` property prevents stale template content:

```javascript
// Disable thumb template rendering in non-reactive environments
switchInstance.update({
  disableThumbRender: true
});
```

This property is primarily designed for non-reactive environments where template functions are called only once and won't update with state changes. It ensures only static styling is rendered, avoiding stale dynamic content.

### Multi-Step Switch

```svelte
<script>
  import { MultiSwitch } from '@keenmate/svelte-switch';

  let selectedIndex = $state(0);
</script>

<MultiSwitch
  bind:selectedIndex
  itemsCount={4}
  size={80}
>
  {#snippet children({ currentIndex, item, isSelected })}
    <span>{['Low', 'Med', 'High', 'Max'][currentIndex]}</span>
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
  {#snippet labelTemplate({ item, isSelected })}
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

<MultiSwitch
  bind:selectedIndex
  itemsCount={4}
  size={70}
  itemStyles={temperatureStyles}
>
  {#snippet children({ currentIndex, item, isSelected })}
    <span>{['❄️', '🌡️', '🔥', '🌋'][currentIndex]}</span>
  {/snippet}
</MultiSwitch>
```

## API Reference

### Switch Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Bindable checked state |
| `isDisabled` | `boolean` | `false` | Disable the switch |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Switch orientation |
| `size` | `number` | `50` | Switch size in pixels |
| `labels` | `string[]` | - | Optional labels for switch states (e.g., `['OFF', 'ON']`) |
| `onToggle` | `(checked: boolean) => void` | - | Toggle event handler |
| `children` | `Snippet<[{ currentIndex: number, item: any, isSelected: boolean }]>` | - | Custom content for thumb |
| `thumbTemplate` | `Snippet<[{ currentIndex: number, currentItem: any, itemsCount: number }]>` | - | Enhanced thumb content with extended context |
| `disableThumbRender` | `boolean` | `false` | Disable rendering children template in thumb (primarily for non-reactive environments) |

### Switch Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `update()` | `{ checked?, isDisabled?, orientation?, size?, items?, itemStyles?, onToggle?, disableThumbRender? }` | Updates component properties from external JavaScript/HTML |

### MultiSwitch Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selectedIndex` | `number` | `0` | Bindable selected step index |
| `isDisabled` | `boolean` | `false` | Disable the switch |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Switch orientation |
| `size` | `number` | `50` | Switch size in pixels |
| `itemsCount` | `number` | `3` | Number of steps |
| `items` | `any[]` | `null` | Array of data items (optional) |
| `itemStyles` | `StepStyle[] \| StepStyle` | `[]` | Custom styling for each step (array) or all steps (object) |
| `shouldDisplayLabels` | `boolean` | `false` | Enable automatic label display (v1.3.0+) |
| `labelPosition` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Label position (horizontal: all positions, vertical: left/right only) |
| `labelRenderMode` | `'absolute' \| 'block'` | `'absolute'` | Label rendering mode - absolute (may overlap) or block (takes space) (v1.4.0+) |
| `labelMember` | `string` | - | Property name to extract label text from items (e.g., `"name"` reads `item.name`) (v1.4.0+) |
| `labelCallback` | `(item: any, index: number) => string` | - | Custom function to generate label text with item and index access (v1.4.0+) |
| `onItemChange` | `(index: number) => void` | - | Item change event handler |
| `children` | `Snippet<[{ currentIndex: number, item: any, isSelected: boolean }]>` | - | Custom content for thumb |
| `thumbTemplate` | `Snippet<[{ currentIndex: number, currentItem: any, itemsCount: number }]>` | - | Enhanced thumb content with extended context |
| `labelTemplate` | `Snippet<[{ currentIndex: number, item: any, isSelected: boolean }]>` | - | Custom label content template (optional, uses default if not provided) |
| `disableThumbRender` | `boolean` | `false` | Disable rendering children template in thumb (primarily for non-reactive environments) |

### MultiSwitch Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `update()` | `{ selectedIndex?, isDisabled?, orientation?, size?, itemsCount?, items?, itemStyles?, shouldDisplayLabels?, labelPosition?, labelRenderMode?, labelMember?, labelCallback?, onItemChange?, disableThumbRender? }` | Updates component properties from external JavaScript/HTML |

### StepStyle Interface

```typescript
interface StepStyle {
  backgroundColor?: string;    // Switch/MultiSwitch background color
  thumbColor?: string;         // Thumb element color
  thumbBorderColor?: string;   // Thumb border color
}
```

## External JavaScript/HTML Usage

When using the components directly from vanilla JavaScript or HTML (not within Svelte), you can use the `update()` method to programmatically change component properties:

```javascript
// Create Switch instance
const switchInstance = new Switch({
  target: document.getElementById('switch-container'),
  props: { checked: false, size: 50 }
});

// Update properties externally
switchInstance.update({
  checked: true,
  size: 80,
  isDisabled: false
});

// Create MultiSwitch instance
const multiSwitchInstance = new MultiSwitch({
  target: document.getElementById('multiswitch-container'),
  props: { selectedIndex: 0, itemsCount: 4 }
});

// Update properties externally
multiSwitchInstance.update({
  selectedIndex: 2,
  size: 70,
  itemsCount: 5,
  itemStyles: [
    { backgroundColor: '#ff0000', thumbColor: '#ffffff', thumbBorderColor: '#cc0000' },
    { backgroundColor: '#00ff00', thumbColor: '#000000', thumbBorderColor: '#00cc00' }
  ]
});
```

This mechanism addresses Svelte 5 reactivity issues when components are used outside of Svelte environments.

## Keyboard Navigation

- **Arrow Keys**: Navigate between steps (all directions supported)
- **Tab**: Focus management with proper tab order
- **Enter/Space**: Toggle binary switch

## Styling

The component uses CSS custom properties for dynamic styling. All calculations are handled in SCSS for optimal performance:

- `--scale`: Size scaling factor
- `--steps`: Number of steps (MultiSwitch)
- `--current-bg-color`: Dynamic background color
- `--current-thumb-color`: Dynamic thumb color
- `--current-thumb-border-color`: Dynamic thumb border color

### Default Label Styling (v1.3.0+)

When using `shouldDisplayLabels={true}` without `labelTemplate`, you can customize the default label appearance using SCSS variables:

```scss
// Override default label variables
$default-label-color: #666;                    // Normal label color
$default-label-active-color: #333;             // Active label color
$default-label-font-size: 14px;                // Base font size
$default-label-font-weight: normal;            // Normal font weight
$default-label-active-font-weight: bold;       // Active label font weight
```

Default labels automatically:
- Display `items` array content when available
- Fallback to "Item 1", "Item 2", etc. when using `itemsCount`
- Apply bold font-weight to the active/selected label
- Scale font-size with the component's `size` prop
- Respect `labelPosition` for positioning logic

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