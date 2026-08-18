import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/**
 * 获取所有已发布文章（排除 draft），按发布日期倒序。
 * 所有列表/详情页都应通过这里读取，保证过滤逻辑统一。
 */
export async function getAllPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** 根据 id（文件名生成的 slug）获取已发布文章（详情页用；不存在返回 undefined） */
export async function getPublishedPost(id: string): Promise<Post | undefined> {
  const posts = await getAllPosts();
  return posts.find((post) => post.id === id);
}
