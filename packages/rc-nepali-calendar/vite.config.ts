import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/components/index.ts"),
      name: "RcNepaliCalendar",
      formats: ["es", "umd"],
      fileName: (format) => `rc-nepali-calendar.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react-jss": "ReactJSS",
        },
      },
    },
  },
});
