import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4000", // адрес твоего фронта
    chromeWebSecurity: false,
    modifyObstructiveCode: false
  },
});
