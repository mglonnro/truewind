const r = Math.PI / 180.0;
const d = 180.0 / Math.PI;

class TrueWind {
  /*
   * s: {
   *   sog // Speed over ground
   *   cog // Course over ground
   *   aws // Apparent wind speed
   *   awd // Apparent wind direction (in degrees)
   *   roll // Roll angle of sensor [optional]
   *   pitch // Pitch angle of sensor [optional]
   * }
   */
  static getTrue(s) {
    let src = this.getAttitudeCorrections(s);
    //let src = Object.assign({}, s);
    //console.log("TEMP:", JSON.stringify(src));

    if (!src.sog) {
      return {
        tws: src.aws,
        twd: src.awd
      };
    }

    let cogR = src.cog * r;
    let awdR = src.awd * r;

    let u = src.sog * Math.sin(cogR) - src.aws * Math.sin(awdR);

    let v = src.sog * Math.cos(cogR) - src.aws * Math.cos(awdR);

    let tws = Math.sqrt(u * u + v * v);
    let twd = undefined;

    if (tws > 0) {
      twd =
        v > 0
          ? 180 + Math.atan(u / v) / (Math.PI / 180)
          : Math.atan(u / v) / (Math.PI / 180);
    }

    if (twd < 0) {
      twd += 360;
    }

    return {
      tws: tws,
      twd: twd
    };
  }


  /*
   * Correct for pitch and roll.
   * This code is borrowed mostly from here:
   * https://kingtidesailing.blogspot.com/2015/10/correcting-nmea-0183-wind-for-vessel.html
   */
  static getAttitudeCorrections(src) {
    let roll = src.roll;
    let pitch = src.pitch;

    // Do nothing if we don't have roll and pitch.
    if (roll === undefined || pitch === undefined) {
      return src;
    }

    let awa = src.awd - src.cog;
    if (awa < 0) {
	awa += 360;
    }
 
    let rwa0 = awa;
    let ws0 = src.aws;

    let wx0 = ws0 * Math.sin(rwa0 * r);
    let wy0 = ws0 * Math.cos(rwa0 * r);

    // Skipping the rotational velocity adjustments for now
    let wx1 = wx0;
    let wy1 = wy0;

    // Adjust for absolute roll and pitch
    let wx2 = wx1 / Math.cos(roll * r);
    let wy2 = wy1 / Math.cos(pitch * r);

    let ws1 = Math.sqrt(Math.pow(wx2, 2) + Math.pow(wy2, 2));
    let rwa1 = Math.atan2(wx2, wy2) * d;

    if (rwa1 < 0) {
      rwa1 += 360;
    }

    return Object.assign({}, src, {
      awa: rwa1,
      awd: (src.cog + rwa1) % 360
    });
  }
}

module.exports = TrueWind;
