import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    name: "LinkedIn AI Reply",
    version: "1.0.0",
    description: "Generates AI replies on LinkedIn messages",
    permissions: ["activeTab"],
    content_scripts: [
      {
        matches: ["https://www.linkedin.com/*"],
        js: ["./src/contentScript.tsx"],
      },
    ],
    action: {
      default_popup: "./src/popup.html",
    },
  },
});
