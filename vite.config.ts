import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries into separate chunks
          'vendor-react': ['react', 'react-dom'],
          'vendor-charts': ['recharts'],
          'vendor-ui': ['@radix-ui/react-dialog', '@radix-ui/react-tabs', '@radix-ui/react-select', '@radix-ui/react-tooltip', '@radix-ui/react-slider', '@radix-ui/react-switch', '@radix-ui/react-accordion', '@radix-ui/react-collapsible', '@radix-ui/react-popover'],
          'vendor-pdf': ['jspdf', 'html2canvas'],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
  },
})
