import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [
    nodePolyfills({
      // Whether to polyfill `global`
      globals: {
        global: true,
      },
    }),
    react(),
  ],
  // resolve: {
  //   alias: {
  //     stream: 'rollup-plugin-node-polyfills/polyfills/stream',
  //     process: 'rollup-plugin-node-polyfills/polyfills/process-es6',
  //     util: 'rollup-plugin-node-polyfills/polyfills/util',
  //     buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
  //   },
  // },
  // optimizeDeps: {
  //   include: ['buffer', 'process', 'stream', 'util'],
  // },
});
