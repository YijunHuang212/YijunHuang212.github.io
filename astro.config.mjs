// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// 用 loadEnv 读取环境变量（同时兼容 .env 文件与 CI/终端注入的变量）
// 文档参考：https://docs.astro.build/en/guides/environment-variables/#using-environment-variables-in-astroconfig
const { PUBLIC_SITE, PUBLIC_BASE } = loadEnv(import.meta.env.MODE, process.cwd(), '');

// GitHub Pages 部署配置（详见 README「🚀 部署到 GitHub Pages」）
// - 用户站点 <username>.github.io：PUBLIC_BASE 留空或 '/'（默认）
// - 项目站点 <username>.github.io/<repo>/：PUBLIC_BASE 设为 '/<repo>'
// 可在 .env 中配置，也可在 GitHub 仓库 Settings → Actions → Variables 中配置，
// 由 .github/workflows/deploy.yml 注入构建环境。
const site = PUBLIC_SITE || 'https://your-username.github.io';
const base = PUBLIC_BASE || '/';

// https://astro.build/config
export default defineConfig({
  site,
  base,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
