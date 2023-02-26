import React from 'react'

const Home = () => {
  return (
    <div>
      <div className="container my-3">
          <h2> Add a Note</h2>

          <form className="my-3">
              <div className="mb-3">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
              </div>
              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                <label className="form-check-label" for="exampleCheck1">Check me out</label>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          </div>

          <div className="container my-3">
              <h2> Your Notes</h2>
          </div>
    
    </div>
  )
}

export default Home