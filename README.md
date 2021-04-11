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
    aws: 10, 			// Apparent wind speed (kt or m/s)
    awa: 34, 			// Apparent wind angle (deg -180 - 180)
    bspd: 5.9, 			// Boat speed as measured (kt or m/s)
    sog: 5.7, 			// Speed over ground (kt or m/s)
    cog: 14, 			// Course over ground (deg true)
    heading: 8, 		// Boat heading (deg magnetic, including deviation)
    variation: 5, 		// Magnetic variation
    roll: -5,			// Boat heeling (deg, - to port, + to starboard) [optional]
    pitch: -2,			// Boat pitch (deg, - bow up, + bow down) [optional]
    K: 10,				// Leeway coefficient, see [1] [optional]
    speedunit: "kt"		// Unit of bspd, needed for leeway [optional]
  })
);

/* Expected output
{
  awa: 34.0851339452323,
  aws: 10.016144980963647,
  leeway: -1.4363688595231254,
  stw: 5.901854481278832,
  vmg: 2.128531457191982,
  tws: 6.239378683682382,
  twa: 67.4232233531618,
  twd: 80.4232233531618,
  soc: 1.2725741359616143,
  doc: 116.85441404030568
} */

// [1] http://sailboatinstruments.blogspot.com/2011/02/leeway-calibration.html
```


## Licensing

MIT
