import Post from './Post'

export default function Post1({posts, comments, button = '1'}) {
    
    return (
        <Post posts={posts} comments={comments} n={1} button={button}/>
    )
}