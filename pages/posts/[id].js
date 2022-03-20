import Date from '../../components/date';
import Head from 'next/head';
import Layout from "../../components/layout";
import utilStyles from '../../styles/utils.module.css';
import { getAllPostIds, getPostData } from "../../lib/posts";

const Post = ({ postData }) => {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date}/>
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
      </article>
    </Layout>
  );
}

export const getStaticPaths = async() => {
  // idとしてとりうる値のリスト
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async({ params }) => {
  // params.idを使用して、ブログの投稿に必要なデータを取得
  const postData = await getPostData(params.id);
  return {
    props: {
      postData
    }
  }
}

export default Post;