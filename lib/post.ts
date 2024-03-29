import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark';
import remarkHtml from 'remark-html';

const postsDirectory = path.join(process.cwd(),'posts');

export function getSortedPostsData(){
    // posts 파일 이름을 잡아주기
    const fileNames = fs.readdirSync(postsDirectory);
    // ['pre-rendering.md', ...]

    const allPostsData = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/,"");

        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf-8');

        const matterResult = matter(fileContents);
        
        return {
            id,
            ...matterResult.data as {date: string; title: string}
        }
    })

    // sorting
    return allPostsData.sort((a,b)=>{
        return (a.date < b.date) ? 1 : -1;
    })
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map(fileName => {
        return {params: {
            id: fileName.replace(/\.md$/, '')
        }}
    })
}

export async function getPostData(id:string) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');

    const matterResult = matter(fileContents);
    const processContent = await remark().use(remarkHtml).process(matterResult.content);
    const contentHtml = processContent.toString();

    return {
        id,
        contentHtml,
        ...(matterResult.data as {date: string; title: string})
    }
}