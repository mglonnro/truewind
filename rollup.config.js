import terser from '@rollup/plugin-terser';

export default [
  {
    input: 'truewind.js',
    output: {
      file: 'dist/truewind.cjs',
      format: 'cjs',
      exports: 'named'
    }
  },
  {
    input: 'truewind.js',
    output: {
      file: 'dist/truewind.min.js',
      format: 'umd',
      name: 'TrueWind',
      exports: 'named'
    },
    plugins: [terser()]
  }
];
