/**
 * Input parameters for true wind calculation
 */
export interface TrueWindInput {
  /** Boat speed over water as measured */
  bspd: number;
  /** Speed over ground */
  sog: number;
  /** Course over ground (degrees) */
  cog: number;
  /** Apparent wind speed */
  aws: number;
  /** Apparent wind angle, including any offset (degrees) */
  awa: number;
  /** Heading (degrees magnetic) */
  heading: number;
  /** Variation (degrees) */
  variation?: number;
  /** Roll angle of sensor (degrees) */
  roll?: number;
  /** Pitch angle of sensor (degrees) */
  pitch?: number;
  /** Leeway coefficient */
  K?: number;
  /** Speed unit for bspd ("m/s" or "kt") */
  speedunit?: "m/s" | "kt";
  /** @deprecated Use awa instead */
  awd?: number;
}

/**
 * Result of true wind calculation
 */
export interface TrueWindResult {
  /** Apparent wind angle (degrees) */
  awa: number;
  /** Apparent wind speed */
  aws: number;
  /** Leeway angle (degrees) */
  leeway: number;
  /** Speed through water */
  stw: number;
  /** Velocity made good */
  vmg: number;
  /** True wind speed */
  tws: number;
  /** True wind angle (degrees) */
  twa: number;
  /** True wind direction (degrees) */
  twd: number;
  /** Speed over current */
  soc: number;
  /** Direction over current (degrees) */
  doc: number;
}

/**
 * TrueWind calculation class for converting apparent wind to true wind
 */
export declare class TrueWind {
  /**
   * Calculate true wind from apparent wind and boat parameters
   * @param input - Input parameters
   * @returns Calculated wind data
   */
  static getTrue(input: TrueWindInput): TrueWindResult;

  /**
   * Correct for pitch and roll
   * @param src - Source data with roll and pitch
   * @returns Corrected data
   */
  static getAttitudeCorrections(src: TrueWindInput): TrueWindInput;
}

export default TrueWind;