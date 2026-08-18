import { getAllPosts, type Post } from './posts';

export interface TagWithCount {
  tag: string;
  count: number;
}

/** 聚合所有标签及对应文章数，按文章数降序（标签云 / 标签总览页用） */
export async function getAllTags(): Promise<TagWithCount[]> {
  const posts = await getAllPosts();
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

/** 获取指定标签下的已发布文章（标签详情页用） */
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.data.tags.includes(tag));
}
