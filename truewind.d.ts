/**
 * Input parameters for true wind calculation
 */
export interface TrueWindInput {
  /** Boat speed over water as measured (m/s) */
  bspd: number;
  /** Speed over ground (m/s) */
  sog: number;
  /** Course over ground (degrees) */
  cog: number;
  /** Apparent wind speed (m/s) */
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
  /** @deprecated Use awa instead */
  awd?: number;
}

/**
 * Result of true wind calculation
 */
export interface TrueWindResult {
  /** Apparent wind angle (degrees) */
  awa: number;
  /** Apparent wind speed (m/s) */
  aws: number;
  /** Leeway angle (degrees) */
  leeway: number;
  /** Speed through water (m/s) */
  stw: number;
  /** Velocity made good (m/s) */
  vmg: number;
  /** True wind speed (m/s) */
  tws: number;
  /** True wind angle (degrees) */
  twa: number;
  /** True wind direction (degrees) */
  twd: number;
  /** Speed over current (m/s) */
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