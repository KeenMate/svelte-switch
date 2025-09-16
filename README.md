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
  {#snippet children({ checked })}
    <span>{checked ? '✓' : '✗'}</span>
  {/snippet}
</Switch>
```

### Multi-Step Switch

```svelte
<script>
  import { MultiSwitch } from '@keenmate/svelte-switch';

  let selectedIndex = $state(0);
</script>

<MultiSwitch
  bind:selectedIndex
  stepsCount={4}
  size={80}
>
  {#snippet children({ selectedIndex })}
    <span>{['Low', 'Med', 'High', 'Max'][selectedIndex]}</span>
  {/snippet}
</MultiSwitch>
```

### Multi-Step Switch with Custom Styling

```svelte
<script>
  const temperatureStyles = [
    { backgroundColor: '#3b82f6', thumbColor: '#1e40af', borderColor: '#2563eb' }, // Cold
    { backgroundColor: '#10b981', thumbColor: '#047857', borderColor: '#059669' }, // Warm
    { backgroundColor: '#f59e0b', thumbColor: '#d97706', borderColor: '#f59e0b' }, // Hot
    { backgroundColor: '#ef4444', thumbColor: '#dc2626', borderColor: '#ef4444' }  // Very Hot
  ];
</script>

<MultiSwitch
  bind:selectedIndex
  stepsCount={4}
  size={70}
  stepStyles={temperatureStyles}
>
  {#snippet children({ selectedIndex })}
    <span>{['❄️', '🌡️', '🔥', '🌋'][selectedIndex]}</span>
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
| `onToggle` | `(checked: boolean) => void` | - | Toggle event handler |
| `children` | `Snippet<[{ checked: boolean }]>` | - | Custom content for thumb |

### Switch Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `update()` | `{ checked?, isDisabled?, orientation?, size? }` | Updates component properties from external JavaScript/HTML |

### MultiSwitch Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selectedIndex` | `number` | `0` | Bindable selected step index |
| `isDisabled` | `boolean` | `false` | Disable the switch |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Switch orientation |
| `size` | `number` | `50` | Switch size in pixels |
| `stepsCount` | `number` | `3` | Number of steps |
| `stepStyles` | `StepStyle[]` | `[]` | Custom styling for each step |
| `onStepChange` | `(index: number) => void` | - | Step change event handler |
| `children` | `Snippet<[{ selectedIndex: number, stepIndex: number, isSelected: boolean }]>` | - | Custom content for thumb |

### MultiSwitch Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `update()` | `{ selectedIndex?, isDisabled?, orientation?, size?, stepsCount?, stepStyles? }` | Updates component properties from external JavaScript/HTML |

### StepStyle Interface

```typescript
interface StepStyle {
  backgroundColor?: string;
  thumbColor?: string;
  borderColor?: string;
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
  props: { selectedIndex: 0, stepsCount: 4 }
});

// Update properties externally
multiSwitchInstance.update({
  selectedIndex: 2,
  size: 70,
  stepsCount: 5,
  stepStyles: [
    { backgroundColor: '#ff0000', thumbColor: '#ffffff' },
    { backgroundColor: '#00ff00', thumbColor: '#000000' }
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
- `--current-border-color`: Dynamic border color

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