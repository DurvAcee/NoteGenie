import React, {useState} from 'react'
import { useNavigate  } from 'react-router-dom';

const Signup = (props) => {

  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""});
  let history = useNavigate();

  const host = "http://localhost:5000";

  const handleSubmit = async (e) => {
      e.preventDefault();
      const { name, email, password } = credentials;
      const response = await fetch(`${host}/api/auth/createuser`, { 
              method: 'POST',
              headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({name, email, password})
        });

      const json = await response.json();
      console.log(json);
      if (json.success){
          // save the authToken and redirect
          localStorage.setItem('token', json.authtoken);
          history("/");
          props.showAlert("Account Created Successfully!", "success")

      } else {
          props.showAlert("Invalid Credentials!", "danger")
      }
  }

  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }


  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className="form-group my-2">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" name="name" onChange = {onChange}
                required placeholder="Enter Name"/>
            </div>

            <div className="form-group my-2">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" id="email" name="email" onChange = {onChange}
                required placeholder="Enter email"/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>

            <div className="form-group my-2">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" name="password" onChange = {onChange}
                required minLength = {5} placeholder="Password"/>
            </div>

            <div className="form-group my-2">
                <label htmlFor="password">Confirm Password</label>
                <input type="password" className="form-control" id="cpassword" name="cpassword" onChange = {onChange}
                required minLength = {5} placeholder="Password"/>
            </div>

            <button type="submit" className="btn btn-primary my-4">Submit</button>
        </form>  
    </div>
  )
}

export default Signup