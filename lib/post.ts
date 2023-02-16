import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

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
            ...allPostsData(matterResult.data as {data: string; title: string})
        }
    })

    // sorting
    return allPostsData.sort((a,b)=>{
        return (a.date < b.date) ? 1 : -1;
    })
}