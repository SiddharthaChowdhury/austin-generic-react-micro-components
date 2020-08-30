// import sass from 'rollup-plugin-sass';
import postcss from "rollup-plugin-postcss";
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';

export default {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
        strict: false
      }
    ],
    plugins: [
      postcss(),
      typescript({ objectHashIgnoreUnknownHack: false })
    ],
    external: ['react', 'react-dom']
  }