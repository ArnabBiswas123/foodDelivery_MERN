//only write rfc it will give you the snippt for ES7 react redux snipits
//ctrl+shift+l for selecting all the similar names
//ctrl+shift+f for global search

import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Badge } from 'react-bootstrap';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';




import Modal from '../Modal';





export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  let data=useCart();
  const history = useHistory();

  const HandleLogout = () => {
    localStorage.removeItem('authToken');
    history.push('/login')
  }




  return (<div>
     <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
        <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
              <Link className="nav-item nav-link active fs-5" to="/">Home</Link></li>
              {(localStorage.getItem('authToken')) ? <li className='nav-item'><Link className="nav-item nav-link active fs-5" to="/myOrder">My Orders</Link></li> : ""}

            </ul>
            {!(localStorage.getItem('authToken')) ?
          (<div className='d-flex'>
            <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
            <Link className="btn bg-white text-success mx-1" to="/createuser">Signup</Link>
          </div>)
          :
          <div>
            <div className='btn bg-white text-success mx-2' onClick={()=>{setCartView(true)}}>My Cart {' '}
              <Badge pill bg='danger'>{data.length}</Badge>
            </div>
            {cartView ? <Modal onClose={()=>{setCartView(false)}}>  <Cart/> </Modal> :null}
            <div className='btn bg-white text-danger mx-2' onClick={HandleLogout}>Logout</div>
          </div>}

          </div>
        </div>
      </nav>
  </div>)
}
