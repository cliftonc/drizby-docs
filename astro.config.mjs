// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: "https://www.drizby.com",
  base: "/docs",
  trailingSlash: "always",
  integrations: [
    starlight({
      title: "Drizby",
      description: "Drizby: Open-source AI Analytics powered by drizzle-cube",
      favicon: "/favicon.ico",
      head: [
        {
          tag: "meta",
          attrs: {
            property: "og:image",
            content: "https://www.drizby.com/images/drizby_2.png",
          },
        },
        {
          tag: "meta",
          attrs: {
            property: "og:image:width",
            content: "1200",
          },
        },
        {
          tag: "meta",
          attrs: {
            property: "og:image:height",
            content: "630",
          },
        },
      ],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/cliftonc/drizby",
        },
      ],
      components: {
        Header: "./src/components/Header.astro",
        SiteTitle: "./src/components/SiteTitle.astro",
      },
      logo: {
        src: "./src/assets/logo.png",
        replacesTitle: false,
      },
      sidebar: [
        {
          label: "Getting Started",
          autogenerate: { directory: "getting-started" },
        },
        {
          label: "Connections",
          autogenerate: { directory: "connections" },
        },
        {
          label: "Semantic Layer",
          autogenerate: { directory: "semantic-layer" },
        },
        {
          label: "Dashboards",
          autogenerate: { directory: "dashboards" },
        },
        {
          label: "AI Notebooks",
          autogenerate: { directory: "notebooks" },
        },
        {
          label: "Users & Security",
          autogenerate: { directory: "users" },
        },
        {
          label: "AI Agents & MCP",
          autogenerate: { directory: "api" },
        },
        {
          label: "Self-Hosting",
          autogenerate: { directory: "self-hosting" },
        },
      ],
      customCss: ["./src/styles/custom.css"],
    }),
  ],
});
