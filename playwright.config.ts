import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  retries: 0,
  use: {
    baseURL: "http://127.0.0.1:4371",
    trace: "off",
  },
  webServer: {
    command: "npm run build && npm run preview -- --host 127.0.0.1 --port 4371",
    url: "http://127.0.0.1:4371/",
    reuseExistingServer: false,
    timeout: 120000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
