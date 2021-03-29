import { NextPage } from 'next'
import Link from 'next/link'

interface Props {
  post: {
    id: number
  }
}

const Post: NextPage<Props> = ({ post }) => {
  return (
    <Link href={`/posts/${post.id}`}>
      <div className="p-4 cursor-pointer sm:w-1/2 lg:w-1/4">post</div>
    </Link>
  )
}

export default Post
