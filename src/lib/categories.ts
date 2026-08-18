import { getAllPosts, type Post } from './posts';

export interface CategoryWithCount {
  category: string;
  count: number;
}

/** 聚合所有合集/分类及对应文章数，按文章数降序（首页文章导航用） */
export async function getAllCategories(): Promise<CategoryWithCount[]> {
  const posts = await getAllPosts();
  const counts = new Map<string, number>();
  for (const post of posts) {
    const cat = post.data.category || '未分类';
    counts.set(cat, (counts.get(cat) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}

/** 获取指定合集/分类下的已发布文章（分类详情页用） */
export async function getPostsByCategory(category: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.data.category === category);
}
