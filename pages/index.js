import Header from "../components/Header/Header";
import Layout from "../components/Layout/Layout";


const Index = () => {
  return (
    <Layout>
    <div className="test">
      <style jsx>
        {`
          div {
            background-color: red;
          }
        `}
      </style>
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
