// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      siteURL: "",
      supabase: {
        cookieName: "donut-diaries-consumer",
      },
    },
  },

  modules: ["@nuxt/ui", "@nuxtjs/supabase"],

  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      exclude: ["/"],
      cookieRedirect: true,
    },
  },
});
