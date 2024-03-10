import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../services/api';
import './login.module.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function Login() {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [logindata,Setlogindata] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async () => {
   
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    const loginrequestdata = {
      ...logindata,
    };
    const config = {
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      }
    };
  
    try {
      const response = await axiosInstance.post("/api/users/login", loginrequestdata, config);
      console.log("response.status", response.status);
      if (response.status === 200) {
        localStorage.setItem("user_id", response.data?.data.user_id);
        navigate("/hotels");
        
      } else if (response.status === 400) {
        setFormErrors(response.data?.message || "Invalid Credentials");
      }
    } catch (error) {
      console.log("Error from API", error);
      setFormErrors("Invalid Credentials");
    }
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit && loginSuccess) {
      console.log("Login successful!");
      // Redirect or perform further actions upon successful login
    }
  }, [formErrors, formValues, isSubmit, loginSuccess]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  return (
    <>
      <div className="bgImg"></div>
      <div className="container">
        {loginSuccess ? (
          <div className="ui message success">
            Signed in successfully
          </div>
        ) : (
          console.log("Entered Details", formValues)
        )}

        <div className="row justify-content-center"> {/* Centering the content */}
          <div className="col-md-6"> {/* Half-width box */}
            <div className="card p-4"> {/* Adding padding */}
              <form>
                <h1>Login</h1>
                <div className="ui divider"></div>
                <div className="ui form">
                  <div className="field">
                    <label>Email</label>
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                   
                      onChange={(e)=> Setlogindata({...logindata,email: e.target.value})}
                    />
                  </div>
                  <p>{formErrors.email}</p>
                  <div className="field">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={(e)=> Setlogindata({...logindata,password: e.target.value})}
                    />
                  </div>
                  <p>{formErrors.password}</p>
                  <button className="btn btn-primary" type='button' onClick={() => handleSubmit()}>Login</button> {/* Bootstrap button */}
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>{" "}
    </>
  );
}

export default Login;
