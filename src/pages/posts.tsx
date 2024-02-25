import { GetStaticProps } from "next";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostsPageProps {
  posts: Post[];
}

// This is a showcase of SSG (Static Site Generation) or ISR (Incremental Static Regeneration)
const PostsPage: React.FC<PostsPageProps> = ({ posts }) => (
  <div>
    <h1>List of posts</h1>
    {posts.slice(0, 10).map((post) => (
      <div key={post.id}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </div>
    ))}
  </div>
);

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();

  return {
    props: {
      posts,
    },
    // NOTE: adding below this page will become ISR
    // revalidate: 1, // In seconds
  };
};

export default PostsPage;
