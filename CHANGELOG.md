# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
| `onStepChange` | `(index: number) => void` | `undefined` | Step change event handler |
| `children` | `Snippet` | `undefined` | Custom thumb content |

### 🔧 Development Notes

This release establishes a solid foundation for a modern Svelte 5 component library with:
- Professional documentation and demo site
- Comprehensive accessibility support
- Flexible styling system
- Type-safe API with clear naming conventions
- Production-ready build and deployment pipeline

[1.1.0]: https://github.com/keenmate/svelte-switch/releases/tag/v1.1.0
[1.0.0]: https://github.com/keenmate/svelte-switch/releases/tag/v1.0.0