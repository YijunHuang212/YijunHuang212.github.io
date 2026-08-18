import rss from '@astrojs/rss';
import { getAllPosts } from '../lib/posts';

export async function GET(context) {
  const posts = await getAllPosts();

  // ⚠️ context.site 不含 base（GitHub Pages 项目站点为 /repo/）
  // 必须手动拼上 BASE_URL，否则 RSS 里的链接会指向错误地址
  const site = context.site ?? new URL('/', 'https://your-username.github.io');

  // ⚠️ 注意：BASE_URL 可能不带尾部斜杠（如 '/astro_blog'），
  // 若直接 new URL('blog/x/', siteWithBase) 相对路径解析会吞掉最后一段路径。
  // 因此先确保 base 以 '/' 结尾。
  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const siteWithBase = `${new URL(base, site).href.replace(/\/$/, '')}/`;

  return rss({
    title: '我的博客',
    description: '一个用 Astro 构建的个人博客，记录前端学习与实践。',
    site: siteWithBase,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      categories: post.data.tags,
      link: `${siteWithBase}blog/${post.id}/`,
    })),
    customData: '<language>zh-cn</language>',
  });
}
