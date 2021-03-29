import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'

import Hero from '../components/home/hero'
import Post from '../components/post/post'
import { getAllPostsData, PostsData } from '../lib/posts'

interface Props {
  posts: PostsData[]
}

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div>
      <Head>
        <title>Title</title>
        <meta name="description" content="description" />
      </Head>
      <Hero />
      <div className="flex flex-wrap -m-4 mb-5">
        {posts?.map((post: any) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPostsData()

  return {
    props: { posts },
    revalidate: 3
  }
}
