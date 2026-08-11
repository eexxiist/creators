'use client';

interface CommentFormProps {
  recipeId: string;
}
import { useCreateComment } from '@/hooks/useComment';
import { useState } from 'react';

const CommentForm = ({ recipeId }: CommentFormProps) => {
  const [content, setContent] = useState('');
  const { mutate: createComment } = useCreateComment();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createComment({ recipeId, content });
      }}
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        name=""
        id=""
        cols={60}
        rows={1}
      ></textarea>
      <button>Отправить</button>
    </form>
  );
};

export default CommentForm;
