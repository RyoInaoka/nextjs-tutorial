import Head from 'next/head';
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";

const Post = ({ postData }) => {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
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