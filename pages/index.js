import Header from "../components/Header/Header";
import Layout from "../components/Layout/Layout";


const Index = () => {
  return (
    <Layout>
    <div className="test">
      <style jsx>
        {`
          div {
              text-align:center;              
          }
        `}
      </style>
      <h1>Welcome To My App </h1>
    </div>
    </Layout>
  );
};

Index.getInitialProps = () => {
  return {
    data: [1, 2, 3],
  };
};

export default Index;
