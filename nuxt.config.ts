import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
const effectLanguageServicePlugin = {
  name: "@effect/language-service",
} as const;

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  typescript: {
    tsConfig: {
      compilerOptions: {
        plugins: [effectLanguageServicePlugin],
        exactOptionalPropertyTypes: true,
        noUnusedLocals: true,
      },
    },
  },
  nitro: {
    typescript: {
      tsConfig: {
        compilerOptions: {
          plugins: [effectLanguageServicePlugin],
          exactOptionalPropertyTypes: true,
          noUnusedLocals: true,
        },
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  experimental: {
    typedPages: true,
  },
});
