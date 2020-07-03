import "bootstrap/dist/css/bootstrap.min.css";
import "../../public/css/paper-kit.min.css";
import "../../public/css/paper-kit.css";
import "../../public/css/font-awesome.min.css";
import "../../public/css/demo.css";
import Head from "next/head";
import Navbars from "../Navbars/Navbars";

const layoutStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
};

const contentStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
};

const Layout = (props) => (
  <div className="Layout" style={layoutStyle}>
    <Head>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
    </Head>
    <Navbars />   
    <div className="Content" style={contentStyle}>
      {props.children}
    </div>   
  </div>
);

export default Layout;
