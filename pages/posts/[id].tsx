import { getAllPostIds, getPostData } from '@/lib/post';
import { GetStaticPaths, GetStaticProps } from 'next'
import homeStyles from '@/styles/Post.module.css'
import Head from 'next/head';
import React from 'react'

export default function Post({postData}: {
    postData: {
        title: string,
        date: string,
        contentHtml: string
    }
}) {
  return (
    <div className={homeStyles.container}>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
            <h1>{postData.title}</h1>
            <div>
                {postData.date}
            </div>
            <div dangerouslySetInnerHTML={{__html: postData.contentHtml}} />
        </article>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds();

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({params}: any) => {
    const postData = await getPostData(params.id as string);
    return {
        props: {
            postData
        }
    }
}