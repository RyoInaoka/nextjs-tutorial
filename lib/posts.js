import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {remark} from "remark";
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export const getSortedPostsData = () => {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map(fileName => {
    // id取得のためファイルから.mdを削除
    const id = fileName.replace(/\.md$/, '');

    // マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // 投稿のメタデータ部分を解析するために gray-matter使用
    const matterResult = matter(fileContents);

    // データをid と合わせる
    return {
      id,
      ...matterResult.data
    }
  })

  // 投稿を日付でソートする
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1 
    } else {
      return -1
    }
  })
}

export const getAllPostIds = () => {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export const getPostData = async(id) => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

   // 投稿のメタデータ部分を解析するために gray-matter使用
   const matterResult = matter(fileContents);

  // remarkで マークダウンをHTML文字列に変換
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

   // データをid と合わせる
   return {
     id,
     contentHtml,
     ...matterResult.data
   }
}