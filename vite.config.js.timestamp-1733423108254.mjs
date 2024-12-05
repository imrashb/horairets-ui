// vite.config.js
import { defineConfig } from "file:///C:/Users/svela/Documents/horairets-ui-1/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/svela/Documents/horairets-ui-1/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false
  },
  test: {
    css: false,
    include: ["src/**/__tests__/*"],
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests.ts",
    clearMocks: true,
    coverage: {
      provider: "istanbul",
      enabled: true,
      100: true,
      reporter: ["text", "lcov"],
      reportsDirectory: "coverage"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxzdmVsYVxcXFxEb2N1bWVudHNcXFxcaG9yYWlyZXRzLXVpLTFcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHN2ZWxhXFxcXERvY3VtZW50c1xcXFxob3JhaXJldHMtdWktMVxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvc3ZlbGEvRG9jdW1lbnRzL2hvcmFpcmV0cy11aS0xL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcclxuICBidWlsZDoge1xyXG4gICAgc291cmNlbWFwOiBmYWxzZSxcclxuICB9LFxyXG4gIHRlc3Q6IHtcclxuICAgIGNzczogZmFsc2UsXHJcbiAgICBpbmNsdWRlOiBbJ3NyYy8qKi9fX3Rlc3RzX18vKiddLFxyXG4gICAgZ2xvYmFsczogdHJ1ZSxcclxuICAgIGVudmlyb25tZW50OiAnanNkb20nLFxyXG4gICAgc2V0dXBGaWxlczogJ3NyYy9zZXR1cFRlc3RzLnRzJyxcclxuICAgIGNsZWFyTW9ja3M6IHRydWUsXHJcbiAgICBjb3ZlcmFnZToge1xyXG4gICAgICBwcm92aWRlcjogJ2lzdGFuYnVsJyxcclxuICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgMTAwOiB0cnVlLFxyXG4gICAgICByZXBvcnRlcjogWyd0ZXh0JywgJ2xjb3YnXSxcclxuICAgICAgcmVwb3J0c0RpcmVjdG9yeTogJ2NvdmVyYWdlJyxcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVQsU0FBUyxvQkFBb0I7QUFDOVUsT0FBTyxXQUFXO0FBR2xCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixPQUFPO0FBQUEsSUFDTCxXQUFXO0FBQUEsRUFDYjtBQUFBLEVBQ0EsTUFBTTtBQUFBLElBQ0osS0FBSztBQUFBLElBQ0wsU0FBUyxDQUFDLG9CQUFvQjtBQUFBLElBQzlCLFNBQVM7QUFBQSxJQUNULGFBQWE7QUFBQSxJQUNiLFlBQVk7QUFBQSxJQUNaLFlBQVk7QUFBQSxJQUNaLFVBQVU7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLFNBQVM7QUFBQSxNQUNULEtBQUs7QUFBQSxNQUNMLFVBQVUsQ0FBQyxRQUFRLE1BQU07QUFBQSxNQUN6QixrQkFBa0I7QUFBQSxJQUNwQjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
