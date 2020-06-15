import Link from 'next/link'
import { Component } from 'react';
import jsCookie from 'js-cookie'
import Router from 'next/router'

class NavBar extends Component {

  static async getInitialProps({ req, res }) {
    console.log("Navbar Getinitial Props REq Val : ",req);
    console.log("Navbar Getinitial Props REq Val : ",res);
    return{}
  }

  // static async getInitialProps () {
  //   res=jsCookie.get('screenname')
  //   if (res) {
  //     res.writeHead(301, {
  //       Location: '/question'
  //     });
  //     res.end();
  //   }  
  //   return {};
  // };


  render() {
    // const userLogin=jsCookie.get("screenname");
    // if(userLogin){
    //  return   Router.push('/question')
    // }
    // else{
    //     return Router.push('/login')
    // }    
    let myname = jsCookie.get("screenname");
    // myname=JSON.parse(myname);
    if (myname) {
      return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse mx-auto" id="navbarNav">
            <ul className="navbar-nav">
              {/* <li className="nav-item active">
              <Link href="/login"><a className="nav-link" href="#">Login <span className="sr-only">(current)</span></a></Link>
            </li>
            <li className="nav-item">
              <Link href="/signup"><a className="nav-link" href="#">Sign Up</a></Link>
            </li> */}
              <li className="nav-item">
                <Link href="/question"><a className="nav-link" href="#">Question</a></Link>
              </li>
              <li className="nav-item">
                <Link href="/category"><a className="nav-link" href="#">Category</a></Link>
              </li>
              <li className="nav-item">
                <Link href="/subcategory"><a className="nav-link" href="#">Sub Category</a></Link>
              </li>
              <li className="nav-item">
                <Link href="/sign"><a className="nav-link" href="#">Sign</a></Link>
              </li>
            </ul>
          </div>
          <div className="ml-auto">
            <button className="btn btn-primary" onClick={() => { jsCookie.remove('screenname'); Router.push('/login') }}>Logout</button>
          </div>
        </nav>
      );
    }
    else {
      return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse mx-auto" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link href="/login"><a className="nav-link" href="#">Login <span className="sr-only">(current)</span></a></Link>
              </li>
              <li className="nav-item">
                <Link href="/signup"><a className="nav-link" href="#">Sign Up</a></Link>
              </li>
            </ul>
          </div>
        </nav>
      );

    }
  }
}

export default NavBar;