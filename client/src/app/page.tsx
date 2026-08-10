'use client';

import RecipeCard from '@/components/RecipeCard';
import { useFeedRecipes } from '@/hooks/useFeedRecipes';
import { Recipe } from '@/types/recipe.types';

export default function Home() {
  const { data, isLoading, error } = useFeedRecipes();

  if (isLoading) {
    return <p>Идет загрузка</p>;
  }

  if (error) {
    return <p>Произошла ошибка</p>;
  }

  return (
    <main>
      <h1>Рекомендации</h1>
      {data?.map((recipe: Recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </main>
  );
}
