import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      // Add Google Fonts URL to the global CSS
      scss: {
        additionalData: `@import "https://fonts.googleapis.com/css2?family=Orbitron&family=PT+Sans&family=Raleway&family=Roboto&display=swap";`,
      },
    },
  },
});
