import Link from 'next/link'
import { Component } from 'react';

class NavBar extends Component {
  render() {
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
            <li className="nav-item">
              <Link href="/question"><a className="nav-link" href="#">Question</a></Link>
            </li>
          </ul>
          <h5>Welcome</h5>
        </div>
      </nav>
    );
  }
}

export default NavBar;