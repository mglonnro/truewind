# TrueWind

TrueWind is a small library for converting apparent wind to true wind. 

## Installation
```
npm install --save @gml/truewind
```

## Usage

```
const TrueWind = require("@gml/truewind");

console.log(
  TrueWind.getTrue({
    aws: 10, // Apparent wind speed
    awd: 45, // Apparent wind direction (0-359)
    sog: 5.7, // Speed over ground
    cog: 14 // Course over ground
  })
);

// Expected output
// { tws: 5.896857444432516, twd: 74.85748402076754 }
```

**NOTE**: If true wind speed (tws) is 0, true wind angle (twd) will be ``undefined``.

## Adjusting for pitch and roll

If you include values for ``pitch`` and ``roll``, the function adjusts the return value for anemometer attitude. The math is grabbed from [this post](https://kingtidesailing.blogspot.com/2015/10/correcting-nmea-0183-wind-for-vessel.html).

```
const TrueWind = require("@gml/truewind");

console.log(
  TrueWind.getTrue({
    aws: 10, // Apparent wind speed
    awd: 45, // Apparent wind direction (0-359)
    sog: 5.7, // Speed over ground
    cog: 14, // Course over ground
    pitch: 2, // Pitch in degrees 
    roll: -15, // Roll in degrees
  })
);

// Expected output
// { tws: 5.97276396046677, twd: 76.12382083253168 }
```

## Licensing

MIT
