export interface RecipePreview {
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

export interface Recipe extends RecipePreview {
  videoUrl: string | null;
  ingredients: string[];
  comments: {
    id: string;
    content: string;
    createdAt: string;
    user: {
      id: string;
      name: string;
      avatarUrl: string;
    };
  }[];
}
