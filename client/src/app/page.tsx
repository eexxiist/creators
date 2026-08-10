'use client';

import RecipeCard from '@/components/recipeCard/RecipeCard';
import { useFeedRecipes } from '@/hooks/useRecipes';
import { RecipePreview } from '@/types/recipe.types';
import styles from '../components/recipeCard/RecipeCard.module.css';

export default function Home() {
  const { data, isLoading, error } = useFeedRecipes();

  if (isLoading) {
    return <p>Идет загрузка</p>;
  }

  if (error) {
    return <p>Произошла ошибка</p>;
  }

  return (
    <main className={styles.main}>
      <h1>Рекомендации</h1>
      {data?.map((recipe: RecipePreview) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </main>
  );
}
