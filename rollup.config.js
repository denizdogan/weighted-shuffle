import typescript from 'rollup-plugin-typescript'
import filesize from 'rollup-plugin-filesize'
import { terser } from 'rollup-plugin-terser'

export default {
  input: './src/index.ts',
  output: {
    file: './lib/index.js',
    format: 'cjs',
    exports: 'named'
  },
  plugins: [typescript(), terser(), filesize()]
}
