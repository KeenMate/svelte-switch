# Svelte Switch Component Makefile

.PHONY: help install dev build preview clean lint format type-check test

# Default target
help: ## Show this help message
	@echo "Available targets:"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# Development
install: ## Install dependencies
	npm install

dev: ## Start development server
	npm run dev

dev-open: ## Start development server and open browser
	npm run dev -- --open

# Build
build: ## Build the project for production
	npm run build

preview: ## Preview the production build
	npm run preview

# Code Quality
lint: ## Run linter
	npm run lint

format: ## Format code with Prettier
	npm run format

type-check: ## Run TypeScript type checking
	npm run check

# Testing
test: ## Run tests
	npm run test

test-watch: ## Run tests in watch mode
	npm run test:watch

# Maintenance
clean: ## Clean build artifacts and node_modules
	rm -rf .svelte-kit
	rm -rf build
	rm -rf dist
	rm -rf node_modules

clean-cache: ## Clean only cache and build artifacts
	rm -rf .svelte-kit
	rm -rf build
	rm -rf dist

reinstall: clean install ## Clean and reinstall dependencies

# Quick development workflow
setup: install ## Initial project setup
	@echo "Project setup complete!"
	@echo "Run 'make dev' to start development server"

# Production workflow
deploy-build: clean install build ## Clean build for deployment
	@echo "Production build complete!"

# Development workflow
start: dev ## Alias for dev command

# Package management
update: ## Update dependencies
	npm update

outdated: ## Check for outdated dependencies
	npm outdated

# Publishing
package: ## Build package for distribution
	npm run package

publish-check: package ## Validate package before publishing
	@echo "Package validation complete!"
	@echo "To publish: make publish"

publish: package ## Publish package to npm
	npm publish

publish-dry: package ## Dry run publish to see what would be published
	npm publish --dry-run