export type Comment = {
  recipeId: string;
  content: string;
};

export type DeleteComment = {
  recipeId: string;
  commentId: string;
};
