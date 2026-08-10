'use client';

import { useRecipe } from '@/hooks/useRecipes';
import { Recipe } from '@/types/recipe.types';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import styles from './RecipePage.module.css';

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useRecipe(id);

  if (isLoading) {
    return <p className={styles.status}>Загрузка...</p>;
  }

  if (error) {
    return <p className={styles.status}>Произошла ошибка</p>;
  }

  if (!data) {
    return <p className={styles.status}>Рецепт не найден</p>;
  }

  const {
    title,
    imageUrl,
    description,
    ingredients,
    videoUrl,
    creator,
    comments,
    _count,
  } = data;

  return (
    <main className={styles.recipePage}>
      <div className={styles.recipeContainer}>
        <section className={styles.hero}>
          <Image
            className={styles.heroImage}
            src={imageUrl}
            alt={title}
            width={1000}
            height={600}
          />
        </section>

        <section className={styles.recipeInfo}>
          <div className={styles.author}>
            <Image
              className={styles.avatar}
              src={creator.avatarUrl}
              alt={creator.name}
              width={48}
              height={48}
            />

            <div>
              <span className={styles.authorLabel}>Автор</span>
              <p className={styles.authorName}>{creator.name}</p>
            </div>
          </div>

          <h1 className={styles.title}>{title}</h1>

          <p className={styles.description}>{description}</p>

          <div className={styles.stats}>
            <span>❤️ {_count.likes}</span>
            <span>💬 {_count.comments}</span>
          </div>
        </section>

        <section className={styles.ingredients}>
          <h2>Ингредиенты</h2>

          <ul>
            {ingredients.map(
              (ingredient: Recipe['ingredients'][number], index: number) => (
                <li key={index}>{ingredient}</li>
              ),
            )}
          </ul>
        </section>

        {videoUrl && (
          <section className={styles.videoSection}>
            <h2>Видео приготовления</h2>

            <video className={styles.video} src={videoUrl} controls />
          </section>
        )}

        <section className={styles.comments}>
          <div className={styles.commentsHeader}>
            <h2>Комментарии</h2>
            <span>{_count.comments}</span>
          </div>

          {comments.length === 0 ? (
            <p className={styles.emptyComments}>Пока нет комментариев</p>
          ) : (
            <div className={styles.commentsList}>
              {comments.map((comment: Recipe['comments'][number]) => (
                <article className={styles.comment} key={comment.id}>
                  <Image
                    className={styles.commentAvatar}
                    src={comment.user.avatarUrl}
                    alt={comment.user.name}
                    width={40}
                    height={40}
                  />

                  <div className={styles.commentContent}>
                    <p className={styles.commentAuthor}>{comment.user.name}</p>

                    <p className={styles.commentText}>{comment.content}</p>

                    <time className={styles.commentDate}>
                      {new Date(comment.createdAt).toLocaleDateString('ru-RU')}
                    </time>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Page;
