import { useState } from 'react';
import Link from 'next/link';

import { FiCalendar, FiUser } from 'react-icons/fi';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { GetStaticProps } from 'next';

import Prismic from '@prismicio/client';
import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  // TODO
  const [results, setResults] = useState(postsPagination.results);
  const [nextPage, setNextPage] = useState(postsPagination.next_page);

  const loadMore = async (): Promise<void> => {
    const response = await fetch(postsPagination.next_page);
    const data = await response.json();
    setNextPage(data.next_page);
    setResults(prev => [...prev, ...data.results]);
  };

  const getFormatedDate = (date: string): string =>
    format(new Date(date), 'dd MMM yyyy', {
      locale: ptBR,
    });

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        {results.map(post => (
          <Link href={`/post/${post.uid}`} key={post.uid + post.data.title}>
            <a>
              <article>
                <h2 className={commonStyles.title}>{post.data.title}</h2>
                <p className={styles.subtitle}>{post.data.subtitle}</p>
                <div className={commonStyles.info}>
                  <span>
                    <FiCalendar size={20} />
                    {getFormatedDate(post.first_publication_date)}
                  </span>
                  <span>
                    <FiUser size={20} />
                    {post.data.author}
                  </span>
                </div>
              </article>
            </a>
          </Link>
        ))}
        {nextPage ? (
          <button className={styles.loadMore} onClick={loadMore} type="submit">
            Carregar mais posts
          </button>
        ) : null}
      </div>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
      pageSize: 2,
    }
  );
  // TODO
  return {
    props: {
      postsPagination: {
        next_page: postsResponse.next_page,
        results: postsResponse.results,
      },
    },
  };
};
