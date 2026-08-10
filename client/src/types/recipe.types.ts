export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  creator: { name: string; avatarUrl: string };
  _count: {
    likes: number;
    comments: number;
  };
}
