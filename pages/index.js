import Header from "../components/Header/Header";

const Index = () => {
  return (
    <div className="test">
      <Header />
      <style jsx>
        {`
          div {
            background-color: red;
          }
        `}
      </style>
    </div>
  );
};

Index.getInitialProps = () => {
  return {
    data: [1, 2, 3],
  };
};

export default Index;
