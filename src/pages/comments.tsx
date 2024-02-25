import { useEffect, useState } from "react";

interface Comment {
  id: number;
  name: string;
  body: string;
}

// This is a showcase of CSR (Client-Side Rendering)
const CommentsPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments"
      );
      const data = await response.json();
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setComments(data);
      setLoading(false);
    };

    fetchComments();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>List of comments</h1>
      {comments.map((comment) => (
        <div key={comment.id}>
          <h3>{comment.name}</h3>
          <p>{comment.body}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentsPage;
