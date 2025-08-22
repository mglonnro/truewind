// windHeightCorrection_mps.js

/**
 * Convert wind speed measured at `fromHeight` (m) to `toHeight` (m).
 * Supports:
 *  - log-law with fixed roughness z0 (matches ORC-style assumption)
 *  - power-law with exponent alpha (marine rule-of-thumb)
 *
 * @param {number} speed           Wind speed at fromHeight [m/s]
 * @param {number} fromHeight      Sensor height in meters (e.g., 26)
 * @param {object} [opts]
 * @param {number} [opts.toHeight=10]   Target height in meters (default 10 m)
 * @param {"log"|"power"} [opts.method="log"]  Correction method
 * @param {number} [opts.z0=0.005]     Roughness length for log-law (meters)
 * @param {number} [opts.alpha=0.11]   Exponent for power-law
 * @returns {number} corrected speed at toHeight [m/s]
 */
function windToHeight(speed, fromHeight, opts = {}) {
  const {
    toHeight = 10,
    method = 'log',
    z0 = 0.005,
    alpha = 0.11
  } = opts;

  if (fromHeight <= 0 || toHeight <= 0) {
    throw new Error('heights must be > 0 meters');
  }
  if (method === 'log' && (z0 <= 0 || z0 >= Math.min(fromHeight, toHeight))) {
    throw new Error('For log-law, z0 must be > 0 and < both heights');
  }

  let U_to;
  if (method === 'log') {
    // Log-law: U(z) ∝ ln(z/z0)
    const num = Math.log(toHeight / z0);
    const den = Math.log(fromHeight / z0);
    U_to = speed * (num / den);
  } else if (method === 'power') {
    // Power-law: U(z) = U_ref * (z/z_ref)^alpha
    U_to = speed * Math.pow(toHeight / fromHeight, alpha);
  } else {
    throw new Error('method must be "log" or "power"');
  }

  return U_to;
}

/**
 * Convenience wrappers for common cases
 */

// ORC-consistent: convert sensor height -> 10 m using log-law with z0=0.005 m
function to10m_ORC(speed, sensorHeight, z0 = 0.005) {
  return windToHeight(speed, sensorHeight, {
    toHeight: 10,
    method: 'log',
    z0
  });
}

// Marine power-law: alpha≈0.11
function to10m_Marine(speed, sensorHeight, alpha = 0.11) {
  return windToHeight(speed, sensorHeight, {
    toHeight: 10,
    method: 'power',
    alpha
  });
}

export { windToHeight, to10m_ORC, to10m_Marine };

