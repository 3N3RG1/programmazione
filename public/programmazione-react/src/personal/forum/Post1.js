import Post from './Post'

export default function Post1({posts, comments, button = '0'}) {

    return (
        <Post posts={posts} comments={comments} n={0} button={button}/>
    )
}