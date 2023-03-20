import React, {useState} from 'react'
import { useNavigate  } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""});
    let history = useNavigate();

    const host = "http://localhost:5000";

    const handleSubmit = async (e) => {
        e.preventDefault();
 
        const response = await fetch(`${host}/api/auth/login`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
          });

        const json = await response.json();
        console.log(json);
        if (json.success){
            // save the authToken and redirect
            localStorage.setItem('authToken', json.authToken);
            props.showAlert("Logged in Successfully!", "success")
            history("/");

        } else {
            props.showAlert("Invalid Credentials!", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <div>
        <h2>Login to Continue to iNoteBook</h2>
        <form className = "my-4" onSubmit={handleSubmit}>
            <div className="form-group my-2">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" id="email" name="email" value = {credentials.email} onChange = {onChange} aria-describedby="emailHelp" placeholder="Enter email"/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group my-2">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" name="password" value = {credentials.password} onChange = {onChange} placeholder="Password"/>
            </div>

            <button type="submit" className="btn btn-primary my-4">Submit</button>
        </form>
    </div>
  )
}

export default Login