---
title: Tailwind CSS v4 入门指南
description: 介绍 Tailwind v4 的新特性，以及如何在 Astro 项目中通过 Vite 插件集成。
pubDate: 2026-08-17
updatedDate: 2026-08-18
tags: ['css', 'tailwind']
category: 前端
draft: false
---

Tailwind CSS v4 引入了全新的 **Vite 插件**集成方式，配置更简单、构建更快。

## 主要变化

- 使用 `@tailwindcss/vite` 插件，无需 PostCSS 配置
- 配置文件可选，推荐直接在 CSS 中用 `@theme` 定义设计令牌
- 暗色模式支持 `@custom-variant dark` 自定义

## 与 Astro 集成

```js
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

然后在全局 CSS 中 `@import "tailwindcss"` 即可。
