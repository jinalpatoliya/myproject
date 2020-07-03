import Link from "next/link";
import classnames from "classnames";
import "./Navbars.css";
import Router from "next/router";
import { Cookies } from "react-cookie";
import { Collapse, Navbar, NavItem, Nav, Container } from "reactstrap";

const cookies = new Cookies();

const Navbars = () => {
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  const onLogoutClick = () => {
    cookies.remove("token");
    Router.push("/login");
  };

  let content = null;
  const userLogin = cookies.get("token");

  if (userLogin == undefined) {
    content = (
      <>
        <NavItem>
          <Link href="/">
            <a>Home</a>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="/login">
            <a>Login</a>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="/signup">
            <a>Sign Up</a>
          </Link>
        </NavItem>
      </>
    );
  } else {
    content = (
      <>
        <NavItem>
          <Link href="/">
            <a>Home</a>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="/question">
            <a>Question</a>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="/questionlist">
            <a>Question List</a>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="/maincategory">
            <a>Main Category</a>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="/category">
            <a>Category</a>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="/subcategory">
            <a>Sub Category</a>
          </Link>
        </NavItem>
        <NavItem>
          <div className="ml-auto">
            <button className="btn btn-dark" onClick={onLogoutClick}>
              Logout
            </button>
          </div>
        </NavItem>
      </>
    );
  }

  return (
    <Navbar      
      color-on-scroll="300"
      expand="lg"
    >
      <Container>
        <div className="bg-primary">
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse,
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar>{content}</Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};
export default Navbars;
