import { RecipePreview } from '@/types/recipe.types';
import Image from 'next/image';
import styles from './RecipeCard.module.css';
import Link from 'next/link';

interface RecipeCardProps {
  recipe: RecipePreview;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { id, imageUrl, title, description, creator, _count } = recipe;

  return (
    <Link href={`/recipes/${id}`} className={styles.recipeLink}>
      <article className={styles.recipeCard}>
        <Image
          className={styles.recipeCardImage}
          src={imageUrl}
          alt={title}
          width={300}
          height={200}
        />

        <div className={styles.recipeContent}>
          <div className={styles.recipeAuthor}>
            <Image
              className={styles.recipeAvatar}
              src={creator.avatarUrl}
              alt={creator.name}
              width={40}
              height={40}
            />

            <span>{creator.name}</span>
          </div>

          <h2 className={styles.recipeTitle}>{title}</h2>

          <p className={styles.recipeDescription}>{description}</p>

          <div className={styles.recipeFooter}>
            <div className={styles.recipeStats}>
              <span>❤️</span>
              <span>{_count.likes}</span>
            </div>

            <div className={styles.recipeStats}>
              <span>💬</span>
              <span>{_count.comments}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default RecipeCard;
