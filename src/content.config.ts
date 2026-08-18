import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 注意：Astro 5+ 内容层要求每个集合必须显式配置 loader
// （旧教程的 type: 'content' 隐式 loader 写法已废弃）
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    // 必填
    title: z.string(),          // 文章标题
    description: z.string(),    // 摘要（卡片 / SEO / RSS）
    pubDate: z.coerce.date(),   // 发布日期（coerce 允许传字符串，自动转 Date）
    // 可选
    updatedDate: z.coerce.date().optional(), // 最后更新日期
    tags: z.array(z.string()).default([]),   // 标签
    heroImage: z.string().optional(),        // 封面图（指向 src/assets 的相对路径）
    draft: z.boolean().default(false),       // 草稿（构建时过滤）
    lang: z.enum(['zh-CN', 'en']).default('zh-CN'), // 预留 i18n
    category: z.string().default('未分类'),   // 合集/分类（首页文章导航按此归类）
    author: z.string().optional(),
  }),
});

export const collections = { blog };
