/*!

=========================================================
* Paper Kit React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React , { Component } from "react";
import Link from 'next/link';
import classnames from "classnames";
import './Navbar.css'
import Router from 'next/router'
import { Cookies } from 'react-cookie';
// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";
const cookies = new Cookies();
function ExamplesNavbar (){

  const [navbarColor, setNavbarColor] = React.useState("bg-primary");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("bg-primary");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
 
  const userLogin = cookies.get('token');
  // console.log("+++++++++++++++")
  // console.log("Navbar Value : ",userLogin)
  // console.log("+++++++++++++++")    
  if (userLogin==undefined) {
  return (
    <Navbar
      className={classnames("fixed-top", navbarColor)}
      color-on-scroll="300"
      expand="lg"
    >
      <Container>
        <div className="bg-primary">
          {/* <NavbarBrand
            data-placement="bottom"
            to="/index"
            target="_blank"
            title="Coded by Creative Tim"
            tag={Link}
          >
            Paper Kit 2
          </NavbarBrand> */}
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
          <Nav navbar>
            <NavItem>
              <Link href="/login">
                <a>
                Login
                </a>
              </Link>
            </NavItem>
            <NavItem>
            <Link href="/signup">
                <a>
                Sign Up
                </a>
              </Link>              
            </NavItem>            
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
  }
  else{
    return(
    <Navbar    className={classnames("fixed-top", navbarColor)}    color-on-scroll="300"    expand="lg"  >
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
        <Nav navbar>
          <NavItem>
            <Link href="/question">
              <a>
              Question
              </a>
            </Link>
          </NavItem>    
          <NavItem>
            <Link href="/questionlist">
              <a>
              Question List
              </a>
            </Link>
          </NavItem>        
          <NavItem>
          <Link href="/category">
              <a>
              Category
              </a>
            </Link>              
          </NavItem>
          <NavItem>
          <Link href="/subcategory">
              <a>
              Sub Category
              </a>
            </Link>              
          </NavItem>  
          {/* <NavItem>
          <Link href="/rsubcategory">
              <a>
              Meta-Sub Category
              </a>
            </Link>              
          </NavItem>   */}
          <NavItem>
            <div className="ml-auto">
              <button className="btn btn-dark" onClick={() => { cookies.remove('token'); Router.push('/login') }}>Logout</button>
            </div>
          </NavItem>        
        </Nav>
      </Collapse>
      </Container>
    </Navbar>
    );
  }
}
ExamplesNavbar.getInitialProps = async({ req, res }) => {
  console.log("Navbar Getinitial Props REq Val : ",req);
  console.log("Navbar Getinitial Props REq Val : ",res);
  // data=Auth({req,res});
  // console.log("+++++++++++++++")
  // console.log("Navbar Value : ",data)
  // console.log("+++++++++++++++")
  return{    
        // decoded:myval.decoded   
  }
  
}
export default ExamplesNavbar;
