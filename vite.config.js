import { defineConfig } from 'vite';

// Vite uses esbuild to transpile JSX by default.
// The @vitejs/plugin-react plugin provides Fast Refresh but is optional.
// To enable Fast Refresh when the plugin is installed, uncomment:
//
// import react from '@vitejs/plugin-react';
// plugins: [react()],

export default defineConfig({
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
  },
});
