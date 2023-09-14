import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import axios from 'axios';


export const getStaticProps = async () =>  {
  const allPostsData = getSortedPostsData();
  const posts = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
  const post = await axios.get('https://jsonplaceholder.typicode.com/posts/1')
  return {
    props: {
      allPostsData,
      posts: posts.data,
      post: post.data,
    },
  };
}

// export const getServerSideProps = async (context) =>  {
//   const post = await axios.get('https://jsonplaceholder.typicode.com/posts/1')
//   return {
//     props: {
//       post: post.data,
//     },
//   };
// }

export default function Home({ allPostsData, posts, post }) {
  return (
    <Layout home>
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <section className={utilStyles.headingMd}>
      <p>Full stack develper; javascript, nextjs, reactjs, nodejs, mongodb, oracle, mysql</p>
      <p>
        (This is a sample website - you’ll be building a site like this on{' '}
        <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
      </p>
    </section>
    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Posts</h2>
        <ul className={utilStyles.list}>
          {posts.map(({ id, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
            </li>
          ))}
        </ul>
      </section>
      <h2>{post.body}</h2>
  </Layout>
  );
}
