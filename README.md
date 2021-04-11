# TrueWind

TrueWind is a small library for converting apparent wind to true wind. 

Thank you for the math goes to these brilliant authors: 
<ul>
  <li>https://kingtidesailing.blogspot.com/2015/10/correcting-nmea-0183-wind-for-vessel.html</li>
<li>http://sailboatinstruments.blogspot.com/2011/05/true-wind-vmg-and-current-calculations.html</i>
</ul>

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
// { tws: 6.058669353713275, twd: 75.65107493575283 }
```

## Licensing

MIT
