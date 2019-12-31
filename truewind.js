class TrueWind {
  /*  
   * src: { sog, cog, aws, awd } 
   * cog and awd in degrees (0-360)
   */
  static GetTrue(src) {
    if (!src.sog) {
      return {
        tws: src.aws,
	twd: src.awd
      }
    }

    let cogR = src.cog * (Math.PI / 180);
    let awdR = src.awd * (Math.PI / 180);

    let u =
      src.sog * Math.sin(cogR) -
      src.aws * Math.sin(awdR);

    let v =
      src.sog * Math.cos(cogR) -
      src.aws * Math.cos(awdR);

    let tws = Math.sqrt(u * u + v * v);
    let twd = undefined;

    if (tws > 0) {
      twd =  v > 0
          ? 180 + Math.atan(u / v) / (Math.PI / 180)
          : Math.atan(u / v) / (Math.PI / 180);
    }

    return {
      tws: tws,
      twd: twd
    };
  }
}

module.exports = TrueWind;
