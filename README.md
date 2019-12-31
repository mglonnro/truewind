# TrueWind

TrueWind is a small library for converting apparent wind to true wind based on speed and course over ground. 

## Installation
```
npm install --save @gml/truewind
```

## Usage

```
const TrueWind = require("@gml/truewind");

console.log(
  TrueWind.GetTrue({
    aws: 10, // Apparent wind speed
    awd: 45, // Apparent wind direction (0-359)
    sog: 5.7, // Speed over ground
    cog: 14 // Course over ground
  })
);

// Expected output
// { tws: 5.896857444432516, twd: 74.85748402076754 }
```

## Licensing

MIT