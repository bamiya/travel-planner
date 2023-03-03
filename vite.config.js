import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import dns from "dns";
import VitePluginHtmlEnv from "vite-plugin-html-env";
// https://vitejs.dev/config/

dns.setDefaultResultOrder("verbatim");

export default ({ mode }) => {
  const env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    base: "travel-planner",
    build: {
      chunkSizeWarningLimit: 1600,
    },
    plugins: [
      react(),
      ViteEjsPlugin((viteconfig) => {
        return {
          root: viteconfig.root,
          KAKAO_MAP_API: env.VITE_APP_KAKAO_MAP_API_KEY,
        };
      }),
      //VitePluginHtmlEnv()
    ],
    server: {
      open: true,
      port: 3000,
    },
    define: {
      "process.env": { ...env, ...loadEnv(mode, process.cwd()) },
    },
  });
};
