import { describe, it, expect } from 'vitest';
import TrueWind from './truewind.js';

describe('TrueWind', () => {
  describe('getTrue', () => {
    it('should calculate true wind from apparent wind data', () => {
      const input = {
        aws: 10,
        awa: 34,
        bspd: 5.9,
        sog: 5.7,
        cog: 14,
        heading: 8,
        variation: 5,
        roll: -5,
        pitch: -2,
        K: 10,
        speedunit: 'kt'
      };

      const result = TrueWind.getTrue(input);

      expect(result).toBeDefined();
      expect(result.tws).toBeCloseTo(6.24, 1);
      expect(result.twa).toBeCloseTo(67.42, 1);
      expect(result.twd).toBeCloseTo(80.42, 1);
      expect(result.vmg).toBeCloseTo(2.13, 1);
      expect(result.leeway).toBeCloseTo(-1.44, 1);
    });

    it('should handle minimum required parameters', () => {
      const input = {
        aws: 15,
        awa: 45,
        bspd: 6,
        heading: 180
      };

      const result = TrueWind.getTrue(input);

      expect(result).toBeDefined();
      expect(result.tws).toBeGreaterThan(0);
      expect(result.twa).toBeDefined();
      expect(result.twd).toBeDefined(); // true wind direction should be calculated
    });

    it('should throw error for missing required parameters', () => {
      const input = {
        aws: 15,
        awa: 45
        // missing bspd and heading
      };

      expect(() => TrueWind.getTrue(input)).toThrow(
        'Please supply at least the parameters { awa, aws, heading, bspd }'
      );
    });

    it('should throw error for invalid speedunit with K parameter', () => {
      const input = {
        aws: 15,
        awa: 45,
        bspd: 6,
        heading: 180,
        K: 10,
        speedunit: 'invalid'
      };

      expect(() => TrueWind.getTrue(input)).toThrow(
        'With the parameter K, also specify { speedunit = \'m/s\' | \'kt\' } for bspd.'
      );
    });

    it('should handle backward compatibility with awd parameter', () => {
      const input = {
        aws: 10,
        awd: 50, // deprecated parameter
        bspd: 5,
        heading: 10,
        variation: 5
      };

      const result = TrueWind.getTrue(input);

      expect(result).toBeDefined();
      expect(result.awa).toBeDefined();
    });

    it('should handle angle normalization', () => {
      const input = {
        aws: 10,
        awa: 200, // > 180
        bspd: 5,
        heading: 10
      };

      const result = TrueWind.getTrue(input);

      expect(result).toBeDefined();
      expect(result.awa).toBeLessThanOrEqual(180);
      expect(result.awa).toBeGreaterThanOrEqual(-180);
    });

    it('should calculate leeway when parameters are provided', () => {
      const input = {
        aws: 12,
        awa: 30,
        bspd: 6,
        heading: 90,
        roll: -10, // heeling to port
        K: 15,
        speedunit: 'kt'
      };

      const result = TrueWind.getTrue(input);

      expect(result).toBeDefined();
      expect(result.leeway).not.toBe(0);
      expect(Math.abs(result.leeway)).toBeLessThanOrEqual(45);
    });

    it('should not calculate leeway when heeling into the wind', () => {
      const input = {
        aws: 12,
        awa: 30, // positive angle
        bspd: 6,
        heading: 90,
        roll: 10, // heeling to starboard (same side as wind)
        K: 15,
        speedunit: 'kt'
      };

      const result = TrueWind.getTrue(input);

      expect(result).toBeDefined();
      expect(result.leeway).toBe(0);
    });
  });

  describe('getAttitudeCorrections', () => {
    it('should return original data when roll and pitch are undefined', () => {
      const input = {
        aws: 10,
        awa: 45
      };

      const result = TrueWind.getAttitudeCorrections(input);

      expect(result).toEqual(input);
    });

    it('should correct for roll and pitch', () => {
      const input = {
        aws: 10,
        awa: 45,
        roll: 10,
        pitch: 5
      };

      const result = TrueWind.getAttitudeCorrections(input);

      expect(result).toBeDefined();
      expect(result.aws).not.toBe(input.aws);
      expect(result.awa).not.toBe(input.awa);
    });

    it('should handle negative awa angles', () => {
      const input = {
        aws: 10,
        awa: -30,
        roll: 5,
        pitch: 2
      };

      const result = TrueWind.getAttitudeCorrections(input);

      expect(result).toBeDefined();
      expect(result.awa).toBeGreaterThanOrEqual(0);
      expect(result.awa).toBeLessThan(360);
    });

    it('should handle zero wind components', () => {
      const input = {
        aws: 0,
        awa: 0,
        roll: 10,
        pitch: 5
      };

      const result = TrueWind.getAttitudeCorrections(input);

      expect(result).toBeDefined();
      expect(result.aws).toBe(0);
    });
  });
});
