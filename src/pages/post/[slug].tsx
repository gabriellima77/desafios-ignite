import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';

import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

interface Content {
  heading: string;
  body: {
    text: string;
  }[];
}

interface RichText {
  type: string;
  text: string;
  spans: { start: number; end: number; type: string }[];
}

export default function Post({ post }: PostProps): JSX.Element {
  // TODO
  const router = useRouter();

  const getRichText = (content: Content[]): RichText[] => {
    const richText = content.reduce((arr, c) => {
      if (c.heading) {
        arr.push({ type: 'heading2', text: c.heading });
      }
      arr.push(...c.body);
      return arr;
    }, []);
    return richText;
  };

  const getPostHTML = (): string => {
    const { content } = post.data;
    const richText = getRichText(content);
    return RichText.asHtml(richText);
  };

  const getTime = (): number => {
    const { content } = post.data;
    const words = content.reduce((counter, data) => {
      let result = counter;
      result += data.heading ? data.heading.split(' ').length : 0;
      result += data.body.reduce((c, t) => {
        return c + t.text.split(' ').length;
      }, 0);
      return result;
    }, 0);
    return Math.ceil(words / 200);
  };

  const getFormatedDate = (date: string): string =>
    format(new Date(date), 'dd MMM yyyy', {
      locale: ptBR,
    });

  return router.isFallback ? (
    <h1>Carregando...</h1>
  ) : (
    <>
      <img
        className={styles.banner}
        src={post.data.banner.url}
        alt={post.data.title}
      />
      <main className={styles.container}>
        <section className={styles.content}>
          <h1 className={commonStyles.title}>{post.data.title}</h1>
          <div className={commonStyles.info}>
            <span>
              <FiCalendar size={20} />
              {getFormatedDate(post.first_publication_date)}
            </span>
            <span>
              <FiUser size={20} />
              {post.data.author}
            </span>
            <span>
              <FiClock size={20} />
              {getTime()} min
            </span>
          </div>
        </section>
        <section
          className={styles.postContent}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: getPostHTML() }}
        />
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
      pageSize: 2,
    }
  );
  // TODO
  return {
    paths: posts.results.map(post => ({ params: { slug: post.uid } })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const prismic = getPrismicClient();
  const response = await prismic.getByUID(
    'posts',
    String(context.params.slug),
    {}
  );

  // TODO
  return {
    props: {
      post: response,
    },
  };
};
