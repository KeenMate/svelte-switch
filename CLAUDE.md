# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Svelte 5 component library that provides customizable switch components. The library exports two main components:

- **Switch**: Binary on/off toggle switch with horizontal/vertical orientation support
- **MultiSwitch**: Multi-step switch component supporting 3+ steps with individual styling

## Common Commands

```bash
# Development server
npm run dev

# Build the project
npm run build

# Package for npm distribution
npm run package

# Type checking
npm run check

# Linting and formatting
npm run lint
npm run format

# Preview built site
npm run preview
```

## Architecture

### Component Structure
- `src/lib/Switch.svelte`: Binary switch component with TypeScript interfaces
- `src/lib/MultiSwitch.svelte`: Multi-step switch component with step styling support
- `src/lib/index.ts`: Main library exports
- `src/lib/assets/main.scss`: Core SCSS styling with CSS custom properties

### Key Features
- Uses Svelte 5 syntax with `$props()`, `$bindable()`, `$derived()`, and `$state()`
- TypeScript interfaces defined inline within components
- Dynamic styling through CSS custom properties (`--scale`, `--steps`, `--current-*-color`)
- Snippet-based slot system for custom thumb content
- SCSS-based calculations for optimal performance

### Development Site Structure
- `src/routes/`: Minimal development routes for testing
- `src/routes/dev/`: Development testing page with interactive controls
- Uses `@sveltejs/adapter-static` for deployment
- Showcase pages have been moved to separate `svelte-switch-showcase` project

### Component Props Pattern
Both components follow consistent prop patterns:
- `bind:checked` / `bind:selectedIndex` for two-way binding
- `isDisabled` boolean prop
- `orientation` as `'horizontal' | 'vertical'`
- `size` number for scaling (default 50px)
- `children` snippet for custom content
- `thumbTemplate` snippet for enhanced thumb content (v1.3.0+)
- Optional callback props (`onToggle`, `onItemChange`)

**MultiSwitch Label Features (v1.3.0+):**
- `shouldDisplayLabels` boolean to enable automatic label display
- `labelPosition` for positioning (`'top' | 'bottom' | 'left' | 'right'`)
- `labelTemplate` snippet for custom label content (optional)
- `items` array for label content (when no custom template provided)

**MultiSwitch Label Rendering (v1.4.0+):**
- `labelRenderMode` for rendering mode (`'absolute' | 'block'`) - default is 'absolute'
  - `'absolute'`: Labels use absolute positioning (may overlap container borders)
  - `'block'`: Labels take up actual space in document flow (stays within container)
- **Clickable Labels**: In vertical orientation with left/right positions, labels become clickable when no `thumbTemplate` is defined, allowing users to jump to any step by clicking the label
- **Enhanced Layout**: Block mode uses proper flexbox layout ensuring labels appear in correct positions (top/left before switch, bottom/right after switch)

### External Update Mechanism
Both components export an `update()` method for external property updates when used from HTML/JavaScript (not needed for Svelte-to-Svelte usage):

**Switch Component:**
```javascript
switchInstance.update({
  checked: true,
  size: 80,
  isDisabled: false,
  orientation: 'vertical'
});
```

**MultiSwitch Component:**
```javascript
multiSwitchInstance.update({
  selectedIndex: 2,
  size: 70,
  itemsCount: 5,
  itemStyles: [/* style objects */],
  shouldDisplayLabels: true,
  labelPosition: 'right',
  labelRenderMode: 'block',
  isDisabled: true,
  orientation: 'horizontal'
});
```

This mechanism addresses Svelte 5 reactivity issues when components are used directly from vanilla JavaScript/HTML environments.

### Styling System
Components use a scale-based sizing system where all dimensions are calculated from a base size (50px) using a scale factor. SCSS handles mathematical calculations with CSS custom properties for dynamic theming.

#### itemStyles Flexibility
The `itemStyles` prop accepts either:
- **Array mode**: `StepStyle[]` - Each item gets its own style (e.g., `[style1, style2, style3]`)
- **Object mode**: `StepStyle` - All items share the same style (e.g., `singleStyle`)

Components automatically detect the type and apply styles accordingly using helper functions.

#### CSS Custom Properties Pattern
Both components use CSS custom property coalescing for consistent styling:
```scss
background-color: var(--current-bg-color, $switch-bg-off);
```
This allows `itemStyles` to override defaults while maintaining fallback values.

#### StepStyle Interface
```typescript
interface StepStyle {
  backgroundColor?: string;    // Switch/MultiSwitch background color
  thumbColor?: string;         // Thumb element color
  thumbBorderColor?: string;   // Thumb border color (renamed from borderColor)
}
```

**Important**: `thumbBorderColor` specifically affects thumb borders only. This leaves room for a future `borderColor` property for switch container borders.

### Default Label System (v1.3.0+)
MultiSwitch components support automatic label rendering without requiring custom `labelTemplate`:

#### Label Display Logic
- **Horizontal orientation**: Only active/selected label shown at specified position (top/bottom/left/right)
- **Vertical orientation**: All labels shown, but only for left/right positions (top/bottom ignored)

#### Content Priority (v1.4.0+ Updated)
1. When `labelMember` provided: Reads property from object items (e.g., `labelMember="name"` reads `item.name`)
2. When `labelCallback` provided: Custom function with access to item and index: `(item: any, index: number) => string`
3. When `labelTemplate` provided: Takes precedence over all automatic rendering
4. Default fallback: "Option 1", "Option 2", etc.

#### SCSS Customization
```scss
$default-label-color: #666;                    // Normal label color
$default-label-active-color: #333;             // Active label color
$default-label-font-size: 14px;                // Base font size
$default-label-font-weight: normal;            // Normal font weight
$default-label-active-font-weight: bold;       // Active label font weight
```

#### Usage Examples
```svelte
<!-- Object items with labelMember -->
<MultiSwitch
  items={[
    { name: 'Small', value: 'S' },
    { name: 'Medium', value: 'M' },
    { name: 'Large', value: 'L' }
  ]}
  labelMember="name"
  shouldDisplayLabels={true}
  labelPosition="right"
  orientation="vertical"
/>

<!-- labelCallback for computed labels -->
<MultiSwitch
  items={[
    { name: 'Basic', price: 10 },
    { name: 'Pro', price: 25 }
  ]}
  labelCallback={(item, index) => `${item.name} - $${item.price}`}
  shouldDisplayLabels={true}
  labelPosition="bottom"
  labelRenderMode="block"
/>

<!-- Simple string array labels -->
<MultiSwitch
  items={['Small', 'Medium', 'Large']}
  shouldDisplayLabels={true}
  labelPosition="right"
  orientation="vertical"
/>

<!-- Custom labels with template (takes precedence) -->
<MultiSwitch
  items={['Small', 'Medium', 'Large']}
  shouldDisplayLabels={true}
  labelPosition="right"
  labelRenderMode="block"
  orientation="vertical"
>
  {#snippet labelTemplate({ item, isSelected })}
    <span style="color: {isSelected ? '#333' : '#666'}">{item} Size</span>
  {/snippet}
</MultiSwitch>
```

## Naming Conventions

### Property Naming Pattern
Follow the `[verb][Something]` convention for boolean properties and descriptive properties:

**Boolean Properties:**
- `isDisabled` (not `disabled`)
- `hasChildren` (not `children` for boolean)
- `isEmpty` (not `empty`)

**Descriptive Properties:**
- `itemsCount` (not `steps` - unclear what "steps" means)
- `selectedIndex` (not `index` - unclear what index)
- `itemStyles` (clear it's styles for items)
- `thumbBorderColor` (not `borderColor` - specifies what element gets the border)
- `shouldDisplayLabels` (not `labels` - clearly indicates boolean behavior)
- `labelPosition` (not `position` - specifies what is being positioned)
- `labelRenderMode` (not `renderMode` - specifies it's for label rendering)
- `labelTemplate` (not `label` - follows template naming convention)

**Rationale:**
- Avoid ambiguous single words that don't clearly communicate purpose
- Use descriptive compound names that make the property's role immediately clear
- Boolean properties should start with verbs like `is`, `has`, `can`, `should`