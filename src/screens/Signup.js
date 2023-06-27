//rfc for short cut

import React, { useState } from 'react'
import { Link,useHistory} from 'react-router-dom'

export default function Signup() {
  const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" });
    const history=useHistory();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: 'POST',
        headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      history.push('/login')
    }
    if (!json.success) {
      alert("Enter Valid Credentials")
    }
  }
  const onChangeHandler = (event) => {
    //event.target means the target field where the curser points to
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  return (
    <>
      <div className='container'>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChangeHandler} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChangeHandler} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChangeHandler} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
            <input type="text" className="form-control" id="exampleInputLocation1" name='geolocation' value={credentials.geolocation} onChange={onChangeHandler} />
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to='/login' className='m-3 btn btn-danger'>Already a User</Link>
        </form>
      </div>
    </>
  )
}
