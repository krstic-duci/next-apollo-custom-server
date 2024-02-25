import { useQuery, gql } from "@apollo/client";
import { NextPage } from "next";

const GET_USER_AND_PRODUCT = gql`
  query GetUserAndProduct($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
      product {
        id
        name
        price
        description
      }
    }
  }
`;

// This is a showcase of apollo server connection with apollo client (together with stitched schemas)
const AboutPage: NextPage = () => {
  const { loading, error, data } = useQuery(GET_USER_AND_PRODUCT, {
    variables: { id: "1" }, // replace with the actual user ID
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>{data.getUser.name}</h1>
      <h2>{data.getUser.email}</h2>
      <h3>Product</h3>
      <p>{data.getUser.product.name}</p>
      <p>{data.getUser.product.price}</p>
      <p>{data.getUser.product.description}</p>
    </div>
  );
};

export default AboutPage;
