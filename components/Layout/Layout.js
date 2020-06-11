import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "../Header/Header";
import NavBar from "../Navbar/Navbar";

const layoutStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%"
};

const contentStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column"
};

const Layout = props => (
  <div className="Layout" style={layoutStyle}>
    <Header />
    <NavBar />
    <div className="Content" style={contentStyle}>
      {props.children}
    </div>
    
  </div>
);

export default Layout;