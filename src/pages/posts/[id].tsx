import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'

import { getAllPostIds, getPostData } from '../../lib/posts'

interface PostProps {
  post: {
    content: string
    created_at: string
    id: number
    title: string
  }
}

const PostData: NextPage<PostProps> = ({ post }) => {
  const router = useRouter()

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (router.isFallback || !post) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <h2>詳細</h2>
      <p>{post.id}</p>
      <p>{post.title}</p>
      <p>{post.content}</p>
      <p>{post.created_at}</p>
    </div>
  )
}

export default PostData

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds()

  return {
    paths,
    fallback: true
  }
}

interface Params extends ParsedUrlQuery {
  id: string
}

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params as Params
  const post = await getPostData(params.id)

  return {
    props: {
      post
    },
    revalidate: 3
  }
}
