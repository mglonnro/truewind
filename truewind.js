/**
 * A small true wind calculation library put together using slightly modified code
 * from the links below. Cheers and thank you to the original authors!
 *
 * @see http://sailboatinstruments.blogspot.com/2011/05/true-wind-vmg-and-current-calculations.html
 * @see https://kingtidesailing.blogspot.com/2015/10/correcting-nmea-0183-wind-for-vessel.html
 */

const DEG_TO_RAD = Math.PI / 180.0;
const RAD_TO_DEG = 180.0 / Math.PI;
const MS_TO_KT = 1.94384;

/**
 * TrueWind calculation class for converting apparent wind to true wind
 */
export class TrueWind {
  /**
   * Calculate true wind from apparent wind and boat parameters
   * @param {Object} input - Input parameters
   * @param {number} input.bspd - Boat speed over water as measured
   * @param {number} input.sog - Speed over ground
   * @param {number} input.cog - Course over ground (degrees)
   * @param {number} input.aws - Apparent wind speed
   * @param {number} input.awa - Apparent wind angle, including any offset (degrees)
   * @param {number} input.heading - Heading (degrees magnetic)
   * @param {number} [input.variation=0] - Variation (degrees)
   * @param {number} [input.roll] - Roll angle of sensor (degrees)
   * @param {number} [input.pitch] - Pitch angle of sensor (degrees)
   * @param {number} [input.K] - Leeway coefficient
   * @param {string} [input.speedunit] - Speed unit for bspd ("m/s" or "kt")
   * @returns {Object} Calculated wind data
   */
  static getTrue(input) {
    const s = { ...input };

    // To maintain backward compatibility, fill in some missing data using what is given.
    if (s.variation === undefined) {
      s.variation = 0;
    }

    if (s.bspd === undefined && s.sog !== undefined) {
      s.bspd = s.sog;
    } else if (s.sog === undefined && s.bspd !== undefined) {
      s.sog = s.bspd;
    }

    if (s.heading === undefined && s.cog !== undefined) {
      s.heading = s.cog;
    } else if (s.cog === undefined && s.heading !== undefined) {
      s.cog = s.heading;
    }

    // In the old version we supplied awd (assued true angle), so here
    // we will convert that to awa if we don't have it.
    if (s.awa === undefined && s.awd !== undefined) {
      s.awa = s.awd - (s.heading + s.variation);

      while (s.awa > 180) {
        s.awa -= 360;
      }

      while (s.awa < -180) {
        s.awa += 360;
      }
    }
    // Backward compability stuff ends here.

    if (
      s.awa === undefined ||
      s.aws === undefined ||
      s.heading === undefined ||
      s.bspd === undefined
    ) {
      throw new Error('Please supply at least the parameters { awa, aws, heading, bspd }');
    }

    if (s.K !== undefined && s.speedunit !== 'kt' && s.speedunit !== 'm/s') {
      throw new Error('With the parameter K, also specify { speedunit = \'m/s\' | \'kt\' } for bspd.');
    }

    // Adjust into correct half of the circle.
    if (s.awa > 180) {
      s.awa -= 360;
    } else if (s.awa < -180) {
      s.awa += 360;
    }

    // Adjust for pitch and roll
    Object.assign(s, this.getAttitudeCorrections(s));

    // Adjust for leeway
    let leeway;

    if (!s.bspd || !s.roll || !s.K || (s.roll > 0 && s.awa > 0) || (s.roll < 0 && s.awa < 0)) {
      // don't adjust if we are not moving, not heeling, or heeling into the wind
      leeway = 0;
    } else {
      leeway =
        (s.K * s.roll) /
        (s.bspd *
          (s.speedunit === 'kt' ? 1 : MS_TO_KT) *
          (s.bspd * (s.speedunit === 'kt' ? 1 : MS_TO_KT)));

      if (leeway > 45) {
        leeway = 45;
      } else if (leeway < -45) {
        leeway = -45;
      }
    }

    // Calculate speed through water, accounting for leeway.
    const stw = s.bspd / Math.cos(leeway * DEG_TO_RAD);

    // Calculate component of stw perpendicular to boat axis
    const lateral_speed = stw * Math.sin(leeway * DEG_TO_RAD);

    // Calculate TWS (true wind speed)
    const cartesian_awa = (270 - s.awa) * DEG_TO_RAD;

    const aws_x = s.aws * Math.cos(cartesian_awa);
    const aws_y = s.aws * Math.sin(cartesian_awa);
    const tws_x = aws_x + lateral_speed;
    const tws_y = aws_y + s.bspd;
    const tws = Math.sqrt(tws_x * tws_x + tws_y * tws_y);

    // Calculate TWA (true wind angle)
    const twa_cartesian = Math.atan2(tws_y, tws_x);
    let twa;

    if (Number.isNaN(twa_cartesian)) {
      // singularity
      if (tws_y < 0.0) {
        twa = 180.0;
      } else {
        twa = 0.0;
      }
    } else {
      twa = 270.0 - twa_cartesian * RAD_TO_DEG;
      if (s.awa >= 0.0) {
        twa = twa % 360;
      } else {
        twa -= 360.0;
      }

      if (twa > 180.0) {
        twa -= 360.0;
      } else if (twa < -180.0) {
        twa += 360.0;
      }
    }

    const vmg = stw * Math.cos((-twa + leeway) * DEG_TO_RAD);

    let wdir = s.heading + twa;
    if (wdir > 360.0) {
      wdir -= 360.0;
    } else if (wdir < 0.0) {
      wdir += 360.0;
    }

    const cog_mag = s.cog - s.variation;
    const alpha = (90.0 - (s.heading + leeway)) * DEG_TO_RAD;
    const gamma = (90.0 - cog_mag) * DEG_TO_RAD;
    const curr_x = s.sog * Math.cos(gamma) - stw * Math.cos(alpha);
    const curr_y = s.sog * Math.sin(gamma) - stw * Math.sin(alpha);
    const soc = Math.sqrt(curr_x * curr_x + curr_y * curr_y);

    const doc_cartesian = Math.atan2(curr_y, curr_x);
    let doc;

    if (Number.isNaN(doc_cartesian)) {
      if (curr_y < 0.0) {
        doc = 180.0;
      } else {
        doc = 0.0;
      }
    } else {
      doc = 90.0 - doc_cartesian * RAD_TO_DEG;
      if (doc > 360.0) {
        doc -= 360.0;
      } else if (doc < 0.0) {
        doc += 360.0;
      }
    }

    return {
      awa: s.awa,
      aws: s.aws,
      leeway: leeway,
      stw: stw,
      vmg: vmg,
      tws: tws,
      twa: twa,
      twd: wdir + s.variation,
      soc: soc,
      doc: doc + s.variation
    };
  }

  /**
   * Correct for pitch and roll.
   * This code is borrowed mostly from here:
   * @see https://kingtidesailing.blogspot.com/2015/10/correcting-nmea-0183-wind-for-vessel.html
   * @param {Object} src - Source data with roll and pitch
   * @returns {Object} Corrected data
   */
  static getAttitudeCorrections(src) {
    const { roll, pitch } = src;

    // Do nothing if we don't have roll and pitch.
    if (roll === undefined || pitch === undefined) {
      return src;
    }

    let awa = src.awa;

    if (awa < 0) {
      awa += 360;
    }

    const rwa0 = awa;
    const ws0 = src.aws;

    const wx0 = ws0 * Math.sin(rwa0 * DEG_TO_RAD);
    const wy0 = ws0 * Math.cos(rwa0 * DEG_TO_RAD);

    // Skipping the rotational velocity adjustments for now
    const wx1 = wx0;
    const wy1 = wy0;

    // Adjust for absolute roll and pitch
    const wx2 = wx1 / Math.cos(roll * DEG_TO_RAD);
    const wy2 = wy1 / Math.cos(pitch * DEG_TO_RAD);

    let ws1 = Math.sqrt(wx2 ** 2 + wy2 ** 2);

    if (wx2 === 0.0 || wy2 === 0.0) {
      ws1 = ws0;
    }

    let rwa1 = Math.atan2(wx2, wy2) * RAD_TO_DEG;

    if (rwa1 < 0) {
      rwa1 += 360;
    }

    return {
      ...src,
      aws: ws1,
      awa: rwa1
    };
  }
}

export default TrueWind;
