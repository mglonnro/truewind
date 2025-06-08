# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TrueWind is a modern ES6+ Node.js library for converting apparent wind to true wind calculations used in sailing applications. The library performs accurate nautical calculations including wind speed/angle conversions, leeway corrections, and current calculations.

## Architecture

The codebase consists of:

- Single main class `TrueWind` in `truewind.js` using ES6 modules and modern JavaScript
- Primary method `getTrue()` accepts sailing parameters and returns calculated wind data
- Attitude corrections handled by `getAttitudeCorrections()` for pitch/roll compensation
- Mathematical conversions use sailing-specific formulas from established nautical sources
- Full TypeScript definitions in `truewind.d.ts`
- Comprehensive test suite using Vitest

## Development Commands

- **Testing**: `npm test` (Vitest test runner)
- **Test Watch**: `npm run test:watch` (Run tests in watch mode)
- **Test Coverage**: `npm run test:coverage` (Generate coverage reports)
- **Linting**: `npm run lint` (ESLint with modern flat config)
- **Lint Fix**: `npm run lint:fix` (Auto-fix linting issues)
- **Formatting**: `npm run format` (Prettier code formatting)
- **Format Check**: `npm run format:check` (Check if code is formatted)
- **Build**: `npm run build` (Rollup build for CommonJS and UMD)
- **Pre-publish**: `npm run prepublishOnly` (Lint, test, and build before publishing)

## Key Implementation Notes

- Uses ES6 modules (`export`/`import`) with `"type": "module"` in package.json
- Input validation requires minimum parameters: `{ awa, aws, heading, bspd }`
- All speed inputs use meters per second (m/s) for consistency
- Backward compatibility maintained for legacy parameter names (e.g., `awd` converted to `awa`)
- Angle normalization handles wrapping around ±180 degrees
- Leeway calculations require `K` coefficient (automatically converts m/s to knots internally)
- Mathematical singularities handled explicitly in wind angle calculations
- All calculations use degree-to-radian conversions with predefined constants
- Uses modern JavaScript features: const/let, arrow functions, destructuring, spread operator
- Error handling uses proper Error objects instead of throwing strings
- Node.js >=16.0.0 required for ES modules support

## Build System

- **Rollup**: Builds CommonJS and UMD distributions in `dist/` directory
- **Vitest**: Modern test framework with coverage support
- **ESLint**: Flat config format with ES6+ rules
- **Prettier**: Code formatting with consistent style
- Dual package support: ES modules (main) + CommonJS (dist/)
