import { defineConfig } from 'vite';
import { stringPlugin } from 'vite-string-plugin';

export default defineConfig({
  root: '.',
  plugins: [stringPlugin()],
  base: '/smartpath-visualizer/',
  server: {
    watch: {
      usePolling: true,
    },
  },
});
