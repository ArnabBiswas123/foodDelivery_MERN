import React, { useState } from 'react'

import { Link, useHistory } from 'react-router-dom'

//useHistory is usefull for navigating the page
export default function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  let history = useHistory();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    console.log(json);
    if (!json.success) {
      return alert("Enter Valid Credentials")
    }
    if (json.success){
    localStorage.setItem("userEmail", credentials.email)
    localStorage.setItem("authToken", json.authToken)
    console.log(localStorage.getItem("authToken"))
    history.push('/')}
  }
  const onChangeHandler = (event) => {
    //event.target means the target field where the curser points to
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  return (
    <div>
      <div className='container'>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChangeHandler} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChangeHandler} />
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to='/createuser' className='m-3 btn btn-danger'>I am a new user</Link>
        </form>
      </div>
    </div>
  )
}
