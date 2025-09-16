# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

[1.0.0]: https://github.com/keenmate/svelte-switch/releases/tag/v1.0.0