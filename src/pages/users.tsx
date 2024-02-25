import { GetServerSideProps } from "next";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UsersPageProps {
  users: User[];
}

// This is a showcase of SSR (Server-Side Rendering)
const UsersPage: React.FC<UsersPageProps> = ({ users }) => (
  <div>
    <h1>List of users</h1>
    {users.map((user) => (
      <div key={user.id}>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>
    ))}
  </div>
);

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();

  return {
    props: {
      users,
    },
  };
};

export default UsersPage;
