import typescript from 'rollup-plugin-typescript'
import filesize from 'rollup-plugin-filesize'

export default {
  input: './src/index.ts',
  output: {
    file: './lib/index.js',
    format: 'cjs',
    exports: 'named'
  },
  plugins: [typescript(), filesize()]
}
