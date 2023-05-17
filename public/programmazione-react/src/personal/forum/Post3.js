import Post from './Post'

export default function Post1({posts, comments, button = '2'}) {
    
    return (
        <Post posts={posts} comments={comments} n={2} button={button}/>
    )
}