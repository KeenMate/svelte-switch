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

### Demo Site Structure
- `src/routes/`: SvelteKit demo pages showcasing component features
- Uses `@sveltejs/adapter-static` for deployment
- Contains example usage patterns in route components

### Component Props Pattern
Both components follow consistent prop patterns:
- `bind:checked` / `bind:selectedIndex` for two-way binding
- `isDisabled` boolean prop
- `orientation` as `'horizontal' | 'vertical'`
- `size` number for scaling (default 50px)
- `children` snippet for custom content
- Optional callback props (`onToggle`, `onStepChange`)

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
  stepsCount: 5,
  stepStyles: [/* style objects */],
  isDisabled: true,
  orientation: 'horizontal'
});
```

This mechanism addresses Svelte 5 reactivity issues when components are used directly from vanilla JavaScript/HTML environments.

### Styling System
Components use a scale-based sizing system where all dimensions are calculated from a base size (50px) using a scale factor. SCSS handles mathematical calculations with CSS custom properties for dynamic theming.

## Naming Conventions

### Property Naming Pattern
Follow the `[verb][Something]` convention for boolean properties and descriptive properties:

**Boolean Properties:**
- `isDisabled` (not `disabled`)
- `hasChildren` (not `children` for boolean)
- `isEmpty` (not `empty`)

**Descriptive Properties:**
- `stepsCount` (not `steps` - unclear what "steps" means)
- `selectedIndex` (not `index` - unclear what index)
- `stepStyles` (clear it's styles for steps)

**Rationale:**
- Avoid ambiguous single words that don't clearly communicate purpose
- Use descriptive compound names that make the property's role immediately clear
- Boolean properties should start with verbs like `is`, `has`, `can`, `should`