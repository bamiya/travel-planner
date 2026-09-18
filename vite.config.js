import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import dns from "dns";
import VitePluginHtmlEnv from "vite-plugin-html-env";
// https://vitejs.dev/config/

dns.setDefaultResultOrder("verbatim");

export default ({ mode }) => {
  const env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  // 번들에 인라인할 환경변수를 VITE_ 접두사가 붙은 것만으로 제한한다.
  // 예전엔 define에 process.env를 통째로 넣어서, 빌드가 돌아가는 머신(CI 등)의 모든
  // 환경변수가 그대로 JS 번들에 실려 나갔다 - 나중에 DB 비밀번호나 배포 키를 환경변수로
  // 주입하는 순간 그게 공개 번들에 박힌다. 클라이언트에 나가도 되는 값만 명시적으로 고른다.
  const clientEnv = Object.fromEntries(
    Object.entries(env).filter(([key]) => key.startsWith("VITE_"))
  );

  return defineConfig({
    base: "/travel-planner/",
    build: {
      chunkSizeWarningLimit: 1600,
    },
    plugins: [
      react(),
      ViteEjsPlugin((viteconfig) => {
        return {
          root: viteconfig.root,
          NAVER_MAP_CLIENT_ID: env.VITE_APP_NAVER_MAP_CLIENT_ID,
        };
      }),
      //VitePluginHtmlEnv()
    ],
    server: {
      open: true,
      port: 5174,
    },
    define: {
      // NODE_ENV는 비밀이 아니고 일부 라이브러리가 참조하므로 mode에서 직접 만들어 넣는다.
      "process.env": {
        ...clientEnv,
        NODE_ENV: mode === "production" ? "production" : "development",
      },
    },
  });
};
