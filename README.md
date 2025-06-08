# TrueWind

[![npm version](https://badge.fury.io/js/%40gml%2Ftruewind.svg)](https://badge.fury.io/js/%40gml%2Ftruewind)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern ES6+ library for converting apparent wind to true wind in sailing applications. This library performs accurate nautical calculations including wind speed/angle conversions, leeway corrections, and current calculations.

## Features

- 🌊 **Accurate Wind Calculations**: Convert apparent wind to true wind with precision
- ⚡ **Modern ES6+ Syntax**: Uses modern JavaScript features and ES modules
- 📐 **Attitude Corrections**: Compensates for boat pitch and roll
- 🧭 **Leeway Calculations**: Accounts for boat drift due to wind pressure
- 🔧 **TypeScript Support**: Full TypeScript definitions included
- 🧪 **Well Tested**: Comprehensive test suite with Vitest
- 📦 **Tree Shakeable**: ES modules for optimal bundling

## Installation

```bash
npm install @gml/truewind
```

## Usage

### ES6 Modules (Recommended)

```javascript
import TrueWind from '@gml/truewind';

const result = TrueWind.getTrue({
  aws: 5.1, // Apparent wind speed (m/s)
  awa: 34, // Apparent wind angle (deg, -180 to 180)
  bspd: 3.0, // Boat speed as measured (m/s)
  sog: 2.9, // Speed over ground (m/s)
  cog: 14, // Course over ground (deg true)
  heading: 8, // Boat heading (deg magnetic, including deviation)
  variation: 5, // Magnetic variation (deg)
  roll: -5, // Boat heeling (deg, - to port, + to starboard) [optional]
  pitch: -2, // Boat pitch (deg, - bow up, + bow down) [optional]
  K: 10 // Leeway coefficient [optional]
});

console.log(result);
```

### CommonJS (Legacy)

```javascript
// Default import (recommended)
const TrueWind = require('@gml/truewind').default;

// Or named import
const { TrueWind } = require('@gml/truewind');

// Same usage as above
```

### TypeScript

```typescript
import TrueWind, { TrueWindInput, TrueWindResult } from '@gml/truewind';

const input: TrueWindInput = {
  aws: 5.1, // m/s
  awa: 34,
  bspd: 3.0, // m/s
  heading: 8
  // ... other parameters
};

const result: TrueWindResult = TrueWind.getTrue(input);
```

## Output

The `getTrue` method returns an object with the following properties:

```javascript
{
  awa: 34.09,      // Apparent wind angle (corrected, degrees)
  aws: 5.15,       // Apparent wind speed (corrected, m/s)
  leeway: -1.44,   // Leeway angle (degrees)
  stw: 3.03,       // Speed through water (m/s)
  vmg: 1.09,       // Velocity made good (m/s)
  tws: 3.21,       // True wind speed (m/s)
  twa: 67.42,      // True wind angle (degrees)
  twd: 80.42,      // True wind direction (degrees)
  soc: 0.65,       // Speed over current (m/s)
  doc: 116.85      // Direction over current (degrees)
}
```

## API Reference

### `TrueWind.getTrue(input)`

Calculate true wind from apparent wind and boat parameters.

**Parameters:**

- `input` (Object): Input parameters (see TrueWindInput interface)

**Returns:**

- Object with calculated wind data (see TrueWindResult interface)

**Required Parameters:**

- `aws`: Apparent wind speed (m/s)
- `awa`: Apparent wind angle (degrees, -180 to 180)
- `bspd`: Boat speed over water (m/s)
- `heading`: Boat heading (degrees magnetic)

**Optional Parameters:**

- `variation`: Magnetic variation (default: 0)
- `sog`: Speed over ground (m/s, falls back to bspd if not provided)
- `cog`: Course over ground (falls back to heading if not provided)
- `roll`: Roll angle for attitude correction
- `pitch`: Pitch angle for attitude correction
- `K`: Leeway coefficient

### `TrueWind.getAttitudeCorrections(src)`

Apply pitch and roll corrections to wind measurements.

## Development

### Setup

```bash
npm install
```

### Available Scripts

```bash
npm test              # Run tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage
npm run lint          # Lint code
npm run lint:fix      # Fix linting issues
npm run format        # Format code with Prettier
npm run format:check  # Check code formatting
npm run build         # Build for distribution
```

### Requirements

- Node.js >=16.0.0

## Mathematical Background

This library implements established nautical calculation methods from these sources:

- [Correcting NMEA 0183 Wind for Vessel Attitude](https://kingtidesailing.blogspot.com/2015/10/correcting-nmea-0183-wind-for-vessel.html)
- [True Wind, VMG and Current Calculations](http://sailboatinstruments.blogspot.com/2011/05/true-wind-vmg-and-current-calculations.html)
- [Leeway Calibration](http://sailboatinstruments.blogspot.com/2011/02/leeway-calibration.html)

## Migration from v1.x

Version 2.0 introduces breaking changes:

1. **ES Modules**: Now uses ES modules by default. Use the CommonJS build if needed.
2. **Node.js 16+**: Minimum Node.js version increased to 16.0.0
3. **Error Handling**: Throws proper Error objects instead of strings
4. **Modern Syntax**: Uses modern JavaScript features (const/let, arrow functions, etc.)

## License

MIT - see [LICENSE](LICENSE) file for details.

## Credits

Special thanks to the original authors whose work made this library possible:

- King Tide Sailing blog contributors
- Sailboat Instruments blog contributors
